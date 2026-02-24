import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@wedding/database";
import { resend } from "@wedding/auth/resend";
import { BroadcastEmail } from "@wedding/email-templates";

const broadcastSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Message body is required"),
});

export type BroadcastResult = {
  success: boolean;
  sentCount: number;
  error?: string;
};

type BroadcastConfig = {
  coupleName: string;
  person1Initial: string;
  person2Initial: string;
};

export async function sendBroadcastEmailImpl(formData: FormData, config: BroadcastConfig): Promise<BroadcastResult> {
  const parsed = broadcastSchema.safeParse({
    subject: formData.get("subject"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join("; ");
    return { success: false, sentCount: 0, error: msg };
  }

  const { subject, body } = parsed.data;

  const subscribers = await prisma.mailingListEntry.findMany({
    where: { subscribed: true },
    select: {
      email: true,
      guest: {
        select: { firstName: true, lastName: true },
      },
    },
  });

  if (subscribers.length === 0) {
    return { success: false, sentCount: 0, error: "No subscribers on the mailing list" };
  }

  const uniqueEmails = new Map<string, string>();
  for (const sub of subscribers) {
    if (!uniqueEmails.has(sub.email)) {
      uniqueEmails.set(sub.email, `${sub.guest.firstName} ${sub.guest.lastName}`);
    }
  }

  const emailList = Array.from(uniqueEmails.entries());
  let sentCount = 0;

  const batchSize = 100;
  for (let i = 0; i < emailList.length; i += batchSize) {
    const batch = emailList.slice(i, i + batchSize);

    try {
      await resend.batch.send(
        batch.map(([email]) => ({
          from: process.env.EMAIL_FROM!,
          to: email,
          subject,
          react: BroadcastEmail({
            subject,
            body,
            coupleName: config.coupleName,
            person1Initial: config.person1Initial,
            person2Initial: config.person2Initial,
          }),
        }))
      );
      sentCount += batch.length;
    } catch (err) {
      console.error("Batch send failed:", err);
      return {
        success: false,
        sentCount,
        error: `Failed after sending ${sentCount} of ${emailList.length} emails`,
      };
    }
  }

  revalidatePath("/admin/emails");

  return { success: true, sentCount };
}
