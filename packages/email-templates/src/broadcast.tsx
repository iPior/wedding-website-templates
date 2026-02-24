import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface BroadcastEmailProps {
  subject: string;
  body: string;
  coupleName: string;
  person1Initial?: string;
  person2Initial?: string;
}

export default function BroadcastEmail({
  subject = "Wedding Update",
  body = "We have an exciting update to share with you!",
  coupleName = "Emma & James",
  person1Initial = "E",
  person2Initial = "J",
}: BroadcastEmailProps) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <Html>
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');`}</style>
      </Head>
      <Preview>{subject}</Preview>
      <Body style={bodyStyle}>
        <Container style={wrapper}>
          <Section style={header}>
            <Text style={monogram}>
              {person1Initial}&nbsp;&nbsp;&&nbsp;&nbsp;
              {person2Initial}
            </Text>
            <Hr style={roseLine} />
          </Section>

          <Section style={content}>
            <Text style={labelStyle}>WEDDING UPDATE</Text>
            <Heading style={mainHeading}>{subject}</Heading>

            {paragraphs.map((paragraph, i) => (
              <Text key={i} style={bodyTextStyle}>
                {paragraph}
              </Text>
            ))}

            <Hr style={divider} />

            <Text style={closing}>
              With love, {coupleName}
            </Text>

            <Text style={unsubscribe}>
              You are receiving this email because you RSVPed to our wedding.
            </Text>
          </Section>

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

const fontDisplay = "'Playfair Display', Georgia, 'Times New Roman', serif";
const fontBody = "'Lato', -apple-system, 'Helvetica Neue', Arial, sans-serif";

const bodyStyle = { backgroundColor: "#fff8f8", fontFamily: fontBody, margin: "0", padding: "40px 0" };
const wrapper = { margin: "0 auto", maxWidth: "520px", backgroundColor: "#ffffff", borderTop: "3px solid #d4a0b0" };
const header = { padding: "36px 32px 0", textAlign: "center" as const };
const monogram = { fontFamily: fontDisplay, fontSize: "26px", color: "#2c2424", letterSpacing: "0.12em", margin: "0 0 16px", textAlign: "center" as const };
const roseLine = { borderTop: "2px solid #d4a0b0", borderBottom: "none" as const, borderLeft: "none" as const, borderRight: "none" as const, width: "48px", margin: "0 auto" };
const content = { padding: "28px 32px 36px" };
const labelStyle = { fontFamily: fontBody, fontSize: "11px", fontWeight: 400 as const, textTransform: "uppercase" as const, letterSpacing: "0.35em", color: "#8a7f7f", margin: "0 0 6px", textAlign: "center" as const };
const mainHeading = { fontFamily: fontDisplay, fontSize: "28px", fontWeight: 400 as const, color: "#2c2424", margin: "0 0 24px", textAlign: "center" as const };
const bodyTextStyle = { fontFamily: fontBody, fontSize: "15px", lineHeight: "1.7", color: "#5a4f4f", margin: "0 0 12px" };
const divider = { borderTop: "1px solid #f0e0e4", borderBottom: "none" as const, borderLeft: "none" as const, borderRight: "none" as const, margin: "28px 0" };
const closing = { fontFamily: fontDisplay, fontSize: "15px", fontStyle: "italic" as const, color: "#8a7f7f", margin: "0 0 24px", textAlign: "center" as const };
const unsubscribe = { fontFamily: fontBody, fontSize: "11px", color: "#8a7f7f", textAlign: "center" as const, margin: "0" };
const footer = { backgroundColor: "#2c2424", padding: "20px 32px", textAlign: "center" as const };
const footerMonogram = { fontFamily: fontDisplay, fontSize: "14px", color: "#8a7f7f", letterSpacing: "0.12em", margin: "0", textAlign: "center" as const };
