import { redirect } from "next/navigation";
import { createClient as createSupabaseServerClient } from "@wedding/auth/server";
import { AdminNav } from "@wedding/ui";
import { Lato } from "next/font/google";
import { weddingConfig } from "../../../../wedding.config";
import { logout } from "@/actions/auth";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div
      className={`${lato.variable} min-h-screen bg-[#fff8f8] text-[#2c2424]`}
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      <AdminNav userEmail={user.email ?? ""} coupleInitials={`${weddingConfig.couple.person1.firstName[0]}&${weddingConfig.couple.person2.firstName[0]}`} logoutAction={logout} />
      <section className="mx-auto max-w-7xl px-6 py-10">{children}</section>
    </div>
  );
}
