import { redirect } from "next/navigation";
import { createClient as createSupabaseServerClient } from "@wedding/auth/server";

export async function logoutImpl() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
