import { getHouseholdByToken, submitRsvp, modifyRsvp } from "@/actions/rsvp";
import { ModifyRsvpClient } from "@wedding/ui";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function ModifyRsvpPage({ params }: Props) {
  const { token } = await params;
  const data = await getHouseholdByToken(token);

  if (!data) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1
          className="text-3xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Invalid Link
        </h1>
        <p className="text-sm leading-relaxed text-[#8a7f7f]">
          This RSVP modification link is invalid or has expired. Please
          contact the couple if you need to update your RSVP.
        </p>
      </main>
    );
  }

  if (data.deadlinePassed) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1
          className="text-3xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Modifications Closed
        </h1>
        <p className="text-sm leading-relaxed text-[#8a7f7f]">
          The RSVP deadline has passed. Please contact the couple directly if
          you need to make changes.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <ModifyRsvpClient
        household={data.household}
        token={token}
        submitRsvp={submitRsvp}
        modifyRsvp={modifyRsvp}
      />
    </main>
  );
}
