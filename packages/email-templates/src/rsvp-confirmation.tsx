import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface GuestDetail {
  name: string;
  attending: boolean;
}

interface PlusOneDetail {
  name: string;
}

interface RsvpConfirmationEmailProps {
  householdName: string;
  guests: GuestDetail[];
  plusOnes: PlusOneDetail[];
  modifyUrl: string;
  attendingCount: number;
  person1Initial?: string;
  person2Initial?: string;
}

export default function RsvpConfirmationEmail({
  householdName = "The Smith Family",
  guests = [],
  plusOnes = [],
  modifyUrl = "https://example.com/rsvp/modify/token",
  attendingCount = 0,
  person1Initial = "E",
  person2Initial = "J",
}: RsvpConfirmationEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');`}</style>
      </Head>
      <Preview>{`Your RSVP was received — ${attendingCount} attending`}</Preview>
      <Body style={body}>
        <Container style={wrapper}>
          {/* Monogram Header */}
          <Section style={header}>
            <Text style={monogram}>
              {person1Initial}&nbsp;&nbsp;&&nbsp;&nbsp;
              {person2Initial}
            </Text>
            <Hr style={roseLine} />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={label}>RSVP CONFIRMATION</Text>
            <Heading style={mainHeading}>Thank You</Heading>
            <Text style={bodyText}>
              Your response has been received for{" "}
              <strong style={{ color: "#2c2424" }}>{householdName}</strong>.
              Here is a summary of your RSVP.
            </Text>

            {/* Guest Summary Card */}
            <Section style={card}>
              <Text style={cardLabel}>GUESTS</Text>
              <Hr style={cardDivider} />
              {guests.map((guest, i) => (
                <Text key={i} style={guestRow}>
                  {guest.name}
                  <span
                    style={guest.attending ? statusAttending : statusDeclined}
                  >
                    {guest.attending ? " — Attending" : " — Not Attending"}
                  </span>
                </Text>
              ))}

              {plusOnes.length > 0 && (
                <>
                  <Text style={{ ...cardLabel, marginTop: "20px" }}>
                    PLUS ONES
                  </Text>
                  <Hr style={cardDivider} />
                  {plusOnes.map((po, i) => (
                    <Text key={i} style={guestRow}>
                      {po.name}
                    </Text>
                  ))}
                </>
              )}
            </Section>

            <Hr style={divider} />

            <Text style={{ ...bodyText, textAlign: "center" as const }}>
              Need to make changes?
            </Text>

            <Section
              style={{ textAlign: "center" as const, margin: "16px 0 0" }}
            >
              <Button href={modifyUrl} style={button}>
                Modify Your RSVP
              </Button>
            </Section>

            <Text style={closing}>
              We are excited to celebrate with you!
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerMonogram}>
              {person1Initial}&nbsp;&&nbsp;
              {person2Initial}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ── Fonts ────────────────────────────────────────────────
const fontDisplay = "'Playfair Display', Georgia, 'Times New Roman', serif";
const fontBody =
  "'Lato', -apple-system, 'Helvetica Neue', Arial, sans-serif";

// ── Styles ───────────────────────────────────────────────
const body = {
  backgroundColor: "#fff8f8",
  fontFamily: fontBody,
  margin: "0",
  padding: "40px 0",
};
const wrapper = {
  margin: "0 auto",
  maxWidth: "520px",
  backgroundColor: "#ffffff",
  borderTop: "3px solid #d4a0b0",
};
const header = {
  padding: "36px 32px 0",
  textAlign: "center" as const,
};
const monogram = {
  fontFamily: fontDisplay,
  fontSize: "26px",
  color: "#2c2424",
  letterSpacing: "0.12em",
  margin: "0 0 16px",
  textAlign: "center" as const,
};
const roseLine = {
  borderTop: "2px solid #d4a0b0",
  borderBottom: "none" as const,
  borderLeft: "none" as const,
  borderRight: "none" as const,
  width: "48px",
  margin: "0 auto",
};
const content = { padding: "28px 32px 36px" };
const label = {
  fontFamily: fontBody,
  fontSize: "11px",
  fontWeight: 400 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.35em",
  color: "#8a7f7f",
  margin: "0 0 6px",
  textAlign: "center" as const,
};
const mainHeading = {
  fontFamily: fontDisplay,
  fontSize: "28px",
  fontWeight: 400 as const,
  color: "#2c2424",
  margin: "0 0 20px",
  textAlign: "center" as const,
};
const bodyText = {
  fontFamily: fontBody,
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#5a4f4f",
  margin: "0 0 8px",
};
const card = {
  backgroundColor: "#fff8f8",
  padding: "20px 24px",
  margin: "24px 0",
};
const cardLabel = {
  fontFamily: fontBody,
  fontSize: "10px",
  fontWeight: 700 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.3em",
  color: "#8a7f7f",
  margin: "0",
};
const cardDivider = {
  borderTop: "1px solid #f0e0e4",
  borderBottom: "none" as const,
  borderLeft: "none" as const,
  borderRight: "none" as const,
  margin: "8px 0 12px",
};
const guestRow = {
  fontFamily: fontBody,
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#2c2424",
  margin: "6px 0",
};
const statusAttending = { color: "#d4a0b0" };
const statusDeclined = { color: "#8a7f7f" };
const divider = {
  borderTop: "1px solid #f0e0e4",
  borderBottom: "none" as const,
  borderLeft: "none" as const,
  borderRight: "none" as const,
  margin: "24px 0",
};
const button = {
  backgroundColor: "#2c2424",
  color: "#fff8f8",
  fontFamily: fontBody,
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.3em",
  padding: "14px 32px",
  textDecoration: "none",
};
const closing = {
  fontFamily: fontDisplay,
  fontSize: "15px",
  fontStyle: "italic" as const,
  color: "#8a7f7f",
  margin: "28px 0 0",
  textAlign: "center" as const,
};
const footer = {
  backgroundColor: "#2c2424",
  padding: "20px 32px",
  textAlign: "center" as const,
};
const footerMonogram = {
  fontFamily: fontDisplay,
  fontSize: "14px",
  color: "#8a7f7f",
  letterSpacing: "0.12em",
  margin: "0",
  textAlign: "center" as const,
};
