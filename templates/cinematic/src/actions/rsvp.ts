"use server";

import {
  searchGuestsImpl,
  getHouseholdForRsvpImpl,
  submitRsvpImpl,
  getHouseholdByTokenImpl,
  modifyRsvpImpl,
  type SubmitRsvpInput,
  type ModifyRsvpInput,
} from "@wedding/actions";
import { weddingConfig } from "../../wedding.config";

const rsvpConfig = {
  rsvpDeadline: weddingConfig.rsvpDeadline,
  person1Initial: weddingConfig.couple.person1.firstName[0],
  person2Initial: weddingConfig.couple.person2.firstName[0],
};

export async function searchGuests(firstName: string, lastName: string) {
  return searchGuestsImpl(firstName, lastName);
}

export async function getHouseholdForRsvp(householdId: string) {
  return getHouseholdForRsvpImpl(householdId);
}

export async function submitRsvp(input: SubmitRsvpInput) {
  return submitRsvpImpl(input, rsvpConfig);
}

export async function getHouseholdByToken(token: string) {
  return getHouseholdByTokenImpl(token);
}

export async function modifyRsvp(input: ModifyRsvpInput) {
  return modifyRsvpImpl(input, rsvpConfig);
}
