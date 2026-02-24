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
      <div className="py-16 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800 mb-4">
          Invalid Link
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm text-neutral-500">
          This RSVP modification link is invalid or has expired. Please
          contact the couple if you need to update your RSVP.
        </p>
      </div>
    );
  }

  if (data.deadlinePassed) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800 mb-4">
          Modifications Closed
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm text-neutral-500">
          The RSVP deadline has passed. Please contact the couple directly if
          you need to make changes.
        </p>
      </div>
    );
  }

  return (
    <div className="rsvp-v1">
      <ModifyRsvpClient
        household={data.household}
        token={token}
        submitRsvp={submitRsvp}
        modifyRsvp={modifyRsvp}
      />
    </div>
  );
}
