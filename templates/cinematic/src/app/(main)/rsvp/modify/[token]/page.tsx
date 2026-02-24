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
      <section className="flex min-h-[50vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-3xl uppercase tracking-[0.2em] text-[#2c2424]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Invalid Link
          </h1>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-[#d4a0b0]" />
          <p className="mt-4 text-sm font-light text-[#8a7f7f]">
            This RSVP modification link is invalid or has expired. Please
            contact the couple if you need to update your RSVP.
          </p>
        </div>
      </section>
    );
  }

  if (data.deadlinePassed) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-3xl uppercase tracking-[0.2em] text-[#2c2424]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Modifications Closed
          </h1>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-[#d4a0b0]" />
          <p className="mt-4 text-sm font-light text-[#8a7f7f]">
            The RSVP deadline has passed. Please contact the couple directly if
            you need to make changes.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-14 sm:py-20">
      <div className="mx-auto max-w-lg px-6 rsvp-v2">
        <ModifyRsvpClient
          household={data.household}
          token={token}
          submitRsvp={submitRsvp}
          modifyRsvp={modifyRsvp}
        />
      </div>
    </section>
  );
}
