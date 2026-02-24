"use server";

import { logoutImpl } from "@wedding/actions";

export async function logout() {
  return logoutImpl();
}
