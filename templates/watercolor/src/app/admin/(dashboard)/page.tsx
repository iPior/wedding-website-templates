import { prisma } from "@wedding/database";
import { AttendanceChart } from "@wedding/ui";
import { RsvpTimeline } from "@wedding/ui";

export default async function AdminDashboardPage() {
  const [householdCount, guestCount, rsvpCounts, rsvpDates] =
    await Promise.all([
      prisma.household.count(),
      prisma.guest.count(),
      prisma.guest.groupBy({
        by: ["attending"],
        _count: true,
      }),
      prisma.guest.findMany({
        where: { rsvpSubmittedAt: { not: null } },
        select: { rsvpSubmittedAt: true },
        orderBy: { rsvpSubmittedAt: "asc" },
      }),
    ]);

  const attending = rsvpCounts.find((r) => r.attending === "YES")?._count ?? 0;
  const declined = rsvpCounts.find((r) => r.attending === "NO")?._count ?? 0;
  const pending = rsvpCounts.find((r) => r.attending === "PENDING")?._count ?? 0;
  const responded = attending + declined;
  const responseRate = guestCount > 0 ? Math.round((responded / guestCount) * 100) : 0;

  const stats = [
    { label: "Households", value: householdCount },
    { label: "Total Guests", value: guestCount },
    { label: "Attending", value: attending },
    { label: "Declined", value: declined },
    { label: "Pending", value: pending },
    { label: "Response Rate", value: `${responseRate}%` },
  ];

  const attendanceData = [
    { name: "YES", value: attending },
    { name: "NO", value: declined },
    { name: "PENDING", value: pending },
  ];

  const timelineMap = new Map<string, number>();
  for (const r of rsvpDates) {
    if (r.rsvpSubmittedAt) {
      const date = r.rsvpSubmittedAt.toISOString().slice(0, 10);
      timelineMap.set(date, (timelineMap.get(date) ?? 0) + 1);
    }
  }
  const timelineData: { date: string; count: number }[] = [];
  const sorted = Array.from(timelineMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  for (const [date, count] of sorted) {
    const prev = timelineData.length > 0 ? timelineData[timelineData.length - 1].count : 0;
    timelineData.push({ date, count: prev + count });
  }

  return (
    <main className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f7f]">Overview</p>
        <h1
          className="mt-1 text-2xl tracking-wide text-[#2c2424]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Dashboard
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-[#f0e0e4] bg-white/60 p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">
              {stat.label}
            </p>
            <p
              className="mt-2 text-2xl text-[#2c2424]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f0e0e4]" />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-[#f0e0e4] bg-white/60 p-5">
          <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">
            Attendance Breakdown
          </p>
          <AttendanceChart data={attendanceData} />
        </div>

        <div className="border border-[#f0e0e4] bg-white/60 p-5">
          <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">
            RSVPs Over Time
          </p>
          <RsvpTimeline data={timelineData} />
        </div>
      </div>
    </main>
  );
}
