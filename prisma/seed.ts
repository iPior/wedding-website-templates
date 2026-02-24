import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const households = [
  {
    name: "The Johnson Family",
    maxPlusOnes: 1,
    guests: [
      { firstName: "Marcus", lastName: "Johnson", isPrimary: true },
      { firstName: "Lisa", lastName: "Johnson", isPrimary: false },
    ],
  },
  {
    name: "The Nguyen Family",
    maxPlusOnes: 0,
    guests: [
      { firstName: "David", lastName: "Nguyen", isPrimary: true },
      { firstName: "Emily", lastName: "Nguyen", isPrimary: false },
      { firstName: "Sophie", lastName: "Nguyen", isPrimary: false },
    ],
  },
  {
    name: "Solo — Derek Chen",
    maxPlusOnes: 1,
    guests: [
      { firstName: "Derek", lastName: "Chen", isPrimary: true },
    ],
  },
  {
    name: "The Kowalski Family",
    maxPlusOnes: 0,
    guests: [
      { firstName: "Anna", lastName: "Kowalski", isPrimary: true },
      { firstName: "Tomasz", lastName: "Kowalski", isPrimary: false },
    ],
  },
  {
    name: "Solo — Priya Patel",
    maxPlusOnes: 1,
    guests: [
      { firstName: "Priya", lastName: "Patel", isPrimary: true },
    ],
  },
  {
    name: "The Martinez Family",
    maxPlusOnes: 2,
    guests: [
      { firstName: "Carlos", lastName: "Martinez", isPrimary: true },
      { firstName: "Maria", lastName: "Martinez", isPrimary: false },
    ],
  },
  {
    name: "Solo — Sarah O'Brien",
    maxPlusOnes: 0,
    guests: [
      { firstName: "Sarah", lastName: "O'Brien", isPrimary: true },
    ],
  },
];

async function main() {
  for (const h of households) {
    const existing = await prisma.household.findFirst({
      where: { name: h.name },
    });
    if (existing) {
      console.log(`Skipping "${h.name}" (already exists)`);
      continue;
    }

    const household = await prisma.household.create({
      data: {
        name: h.name,
        maxPlusOnes: h.maxPlusOnes,
        guests: { create: h.guests },
      },
    });
    console.log(`Seeded "${household.name}" with ${h.guests.length} guest(s)`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
