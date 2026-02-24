import { prisma } from "@wedding/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  BroadcastForm,
} from "@wedding/ui";
import { sendBroadcastEmail } from "@/actions/emails";

export default async function AdminEmailsPage() {
  const [subscribers, totalSubscribed, totalUnsubscribed] = await Promise.all([
    prisma.mailingListEntry.findMany({
      include: {
        guest: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.mailingListEntry.count({ where: { subscribed: true } }),
    prisma.mailingListEntry.count({ where: { subscribed: false } }),
  ]);

  return (
    <main className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f7f]">Manage</p>
        <h1
          className="mt-1 text-2xl tracking-wide text-[#2c2424]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Emails
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#8a7f7f]/70">
          {totalSubscribed} subscribed · {totalUnsubscribed} unsubscribed
        </p>
      </div>

      <BroadcastForm subscriberCount={totalSubscribed} sendBroadcastEmail={sendBroadcastEmail} />

      <div className="h-px bg-[#f0e0e4]" />

      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">Mailing List</p>

        {subscribers.length > 0 ? (
          <div className="border border-[#f0e0e4] bg-white/60">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#f0e0e4] hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Name</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Email</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Status</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f] font-normal">Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((entry) => (
                  <TableRow key={entry.id} className="border-b border-[#f0e0e4] hover:bg-[#fff8f8]">
                    <TableCell className="text-sm text-[#2c2424]">
                      {entry.guest.firstName} {entry.guest.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-[#8a7f7f]">
                      {entry.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className="text-xs uppercase tracking-[0.15em]"
                        style={{ color: entry.subscribed ? "#2c2424" : "#d4a0b0" }}
                      >
                        {entry.subscribed ? "Subscribed" : "Unsubscribed"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-[#8a7f7f]">
                      {entry.createdAt.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="py-12 text-center text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">
            No subscribers yet. Guests are added when they submit an RSVP.
          </p>
        )}
      </div>
    </main>
  );
}
