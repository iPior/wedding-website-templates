import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma, type TransactionClient } from "@wedding/database";

// --- CSV Import ---

const csvRowSchema = z.object({
  household_name: z.string().min(1, "Household name is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  is_primary: z
    .string()
    .transform((v) => v.toLowerCase() === "true" || v === "1")
    .pipe(z.boolean()),
  max_plus_ones: z
    .string()
    .transform((v) => parseInt(v, 10))
    .pipe(z.number().int().min(0)),
});

type CsvRow = z.infer<typeof csvRowSchema>;

function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    return { headers: [], rows: [] };
  }

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const rows = lines.slice(1).map((line) => line.split(",").map((c) => c.trim()));

  return { headers, rows };
}

export type ImportResult = {
  success: boolean;
  householdsCreated: number;
  guestsCreated: number;
  errors: string[];
};

export async function importGuestsImpl(formData: FormData): Promise<ImportResult> {
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return { success: false, householdsCreated: 0, guestsCreated: 0, errors: ["No file provided"] };
  }

  const text = await file.text();
  const { headers, rows } = parseCsv(text);

  if (rows.length === 0) {
    return { success: false, householdsCreated: 0, guestsCreated: 0, errors: ["CSV file is empty or has no data rows"] };
  }

  const requiredHeaders = ["household_name", "first_name", "last_name", "is_primary", "max_plus_ones"];
  const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));
  if (missingHeaders.length > 0) {
    return {
      success: false,
      householdsCreated: 0,
      guestsCreated: 0,
      errors: [`Missing required columns: ${missingHeaders.join(", ")}`],
    };
  }

  const errors: string[] = [];
  const validRows: CsvRow[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] ?? "";
    });

    const result = csvRowSchema.safeParse(obj);
    if (!result.success) {
      const issues = result.error.issues.map((issue) => issue.message).join("; ");
      errors.push(`Row ${i + 2}: ${issues}`);
    } else {
      validRows.push(result.data);
    }
  }

  if (validRows.length === 0) {
    return { success: false, householdsCreated: 0, guestsCreated: 0, errors };
  }

  const householdMap = new Map<string, CsvRow[]>();
  for (const row of validRows) {
    const existing = householdMap.get(row.household_name) ?? [];
    existing.push(row);
    householdMap.set(row.household_name, existing);
  }

  for (const [householdName, members] of householdMap) {
    const seen = new Set<string>();
    for (const member of members) {
      const key = `${member.first_name.toLowerCase()}|${member.last_name.toLowerCase()}`;
      if (seen.has(key)) {
        errors.push(`Duplicate guest "${member.first_name} ${member.last_name}" in household "${householdName}"`);
      }
      seen.add(key);
    }
  }

  if (errors.length > 0) {
    return { success: false, householdsCreated: 0, guestsCreated: 0, errors };
  }

  let householdsCreated = 0;
  let guestsCreated = 0;

  await prisma.$transaction(async (tx: TransactionClient) => {
    for (const [householdName, members] of householdMap) {
      const maxPlusOnes = Math.max(...members.map((m) => m.max_plus_ones));

      const household = await tx.household.create({
        data: {
          name: householdName,
          maxPlusOnes,
          guests: {
            create: members.map((m) => ({
              firstName: m.first_name,
              lastName: m.last_name,
              isPrimary: m.is_primary,
            })),
          },
        },
      });

      householdsCreated++;
      guestsCreated += members.length;

      void household;
    }
  });

  revalidatePath("/admin/guests");

  return { success: true, householdsCreated, guestsCreated, errors: [] };
}

// --- CRUD Actions ---

const addGuestSchema = z.object({
  householdName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  isPrimary: z.boolean().default(false),
  maxPlusOnes: z.number().int().min(0).default(0),
});

export async function addGuestImpl(formData: FormData) {
  const parsed = addGuestSchema.safeParse({
    householdName: formData.get("householdName"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email") || undefined,
    isPrimary: formData.get("isPrimary") === "true",
    maxPlusOnes: parseInt(formData.get("maxPlusOnes") as string || "0", 10),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const { householdName, firstName, lastName, email, isPrimary, maxPlusOnes } = parsed.data;

  let household = await prisma.household.findFirst({
    where: { name: householdName },
  });

  if (!household) {
    household = await prisma.household.create({
      data: { name: householdName, maxPlusOnes },
    });
  }

  await prisma.guest.create({
    data: {
      householdId: household.id,
      firstName,
      lastName,
      email: email || null,
      isPrimary,
    },
  });

  revalidatePath("/admin/guests");
  return { success: true };
}

export async function deleteGuestImpl(guestId: string) {
  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
    include: { household: { include: { guests: true } } },
  });

  if (!guest) {
    return { success: false, error: "Guest not found" };
  }

  await prisma.guest.delete({ where: { id: guestId } });

  if (guest.household.guests.length <= 1) {
    await prisma.household.delete({ where: { id: guest.householdId } });
  }

  revalidatePath("/admin/guests");
  return { success: true };
}

export async function deleteHouseholdImpl(householdId: string) {
  await prisma.household.delete({ where: { id: householdId } });
  revalidatePath("/admin/guests");
  return { success: true };
}

// --- CSV Export ---

export async function exportGuestsCsvImpl(): Promise<string> {
  const guests = await prisma.guest.findMany({
    include: { household: true },
    orderBy: [{ household: { name: "asc" } }, { isPrimary: "desc" }],
  });

  const headers = [
    "household_name",
    "first_name",
    "last_name",
    "email",
    "is_primary",
    "attending",
    "dietary_restrictions",
  ];

  const rows = guests.map((g) => [
    csvEscape(g.household.name),
    csvEscape(g.firstName),
    csvEscape(g.lastName),
    csvEscape(g.email ?? ""),
    g.isPrimary ? "true" : "false",
    g.attending ?? "PENDING",
    csvEscape(g.dietaryRestrictions ?? ""),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
