import { Suspense } from "react";
import { prisma, AttendanceStatus } from "@wedding/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  CsvUpload,
  AddGuestForm,
  DeleteGuestButton,
  DeleteHouseholdButton,
  GuestFilters,
  CsvExportButton,
} from "@wedding/ui";
import { importGuests, addGuest, deleteGuest, deleteHousehold, exportGuestsCsv } from "@/actions/guests";

type Props = {
  searchParams: Promise<{ search?: string; status?: string }>;
};

export default async function AdminGuestsPage({ searchParams }: Props) {
  const { search, status } = await searchParams;

  const where: Record<string, unknown> = {};
  if (status && ["YES", "NO", "PENDING"].includes(status)) {
    where.attending = status as AttendanceStatus;
  }
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
    ];
  }

  const households = await prisma.household.findMany({
    where: { guests: { some: where } },
    include: {
      guests: {
        where,
        orderBy: { isPrimary: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  const totalGuests = households.reduce((sum, h) => sum + h.guests.length, 0);

  return (
    <main className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f7f]">Manage</p>
          <h1
            className="mt-1 text-2xl tracking-wide text-[#2c2424]"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Guests
          </h1>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#8a7f7f]/70">
            {households.length} household(s) · {totalGuests} guest(s)
            {(search || status) && " · filtered"}
          </p>
        </div>
        <CsvExportButton exportGuestsCsv={exportGuestsCsv} />
      </div>

      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">Import from CSV</p>
        <p className="text-[10px] tracking-wide text-[#8a7f7f]/60">
          Expected columns: household_name, first_name, last_name, is_primary, max_plus_ones
        </p>
        <CsvUpload importGuests={importGuests} />
      </div>

      <div className="h-px bg-[#f0e0e4]" />

      <AddGuestForm addGuest={addGuest} />

      <Suspense fallback={null}>
        <GuestFilters />
      </Suspense>

      {households.length > 0 && (
        <div className="border border-[#f0e0e4] bg-white/60">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#f0e0e4] hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Household</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Name</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Email</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Primary</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">RSVP</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Dietary</TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {households.flatMap((household) =>
                household.guests.map((guest, guestIdx) => (
                  <TableRow key={guest.id} className="border-b border-[#f0e0e4] hover:bg-[#fff8f8]">
                    <TableCell className="text-sm">
                      {guestIdx === 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[#2c2424]">{household.name}</span>
                          <span className="text-xs text-[#8a7f7f]/60">(+{household.maxPlusOnes})</span>
                          <DeleteHouseholdButton householdId={household.id} deleteHousehold={deleteHousehold} />
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-sm text-[#2c2424]">
                      {guest.firstName} {guest.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-[#8a7f7f]">
                      {guest.email ?? "\u2014"}
                    </TableCell>
                    <TableCell className="text-sm text-[#8a7f7f]">
                      {guest.isPrimary ? "Yes" : "\u2014"}
                    </TableCell>
                    <TableCell>
                      <span
                        className="text-xs uppercase tracking-[0.15em]"
                        style={{
                          color:
                            guest.attending === "YES"
                              ? "#2c2424"
                              : guest.attending === "NO"
                                ? "#d4a0b0"
                                : "#8a7f7f",
                        }}
                      >
                        {guest.attending ?? "PENDING"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-[#8a7f7f]">
                      {guest.dietaryRestrictions ?? "\u2014"}
                    </TableCell>
                    <TableCell>
                      <DeleteGuestButton guestId={guest.id} deleteGuest={deleteGuest} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {households.length === 0 && (
        <p className="py-12 text-center text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">
          {search || status
            ? "No guests match your filters."
            : "No guests yet. Import a CSV or add guests manually."}
        </p>
      )}
    </main>
  );
}
