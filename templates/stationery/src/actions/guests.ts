"use server";

import {
  importGuestsImpl,
  addGuestImpl,
  deleteGuestImpl,
  deleteHouseholdImpl,
  exportGuestsCsvImpl,
} from "@wedding/actions";

export async function importGuests(formData: FormData) {
  return importGuestsImpl(formData);
}

export async function addGuest(formData: FormData) {
  return addGuestImpl(formData);
}

export async function deleteGuest(guestId: string): Promise<void> {
  await deleteGuestImpl(guestId);
}

export async function deleteHousehold(householdId: string): Promise<void> {
  await deleteHouseholdImpl(householdId);
}

export async function exportGuestsCsv() {
  return exportGuestsCsvImpl();
}
