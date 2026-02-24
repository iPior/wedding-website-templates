export { prisma } from "./client";
export type { PrismaClient } from "@prisma/client";
export { AttendanceStatus } from "@prisma/client";

// Transaction client type for typing `tx` parameter in prisma.$transaction callbacks
import type { PrismaClient as _PC } from "@prisma/client";
export type TransactionClient = Omit<_PC, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">;
