import { redirect } from "next/navigation";
import { createClient as createSupabaseServerClient } from "@wedding/auth/server";
import { AdminNav } from "@wedding/ui";
import { Lora } from "next/font/google";
import { weddingConfig } from "../../../../wedding.config";
import { logout } from "@/actions/auth";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
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

  const coupleInitials = `${weddingConfig.couple.person1.firstName[0]}&${weddingConfig.couple.person2.firstName[0]}`;

  return (
    <div
      className={`${lora.variable} min-h-screen bg-[#FDFBF7] text-neutral-800`}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <AdminNav userEmail={user.email ?? ""} coupleInitials={coupleInitials} logoutAction={logout} />
      <section className="mx-auto max-w-7xl px-6 py-10">{children}</section>
    </div>
  );
}
