import { Body, Button, Container, Head, Hr, Html, Img, Preview, render, Section, Text } from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  actionLabel: string;
  buttonText: string;
  href: string;
}

export const EmailTemplate = ({
  actionLabel,
  buttonText,
  href,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Din leverandør for skjedne fotballdrakter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-up.fdb.png`}
            width="150"
            height="150"
            alt="Fotballdraktbutikken"
            style={logo}
          />
          <Text style={paragraph}>Hallayen,</Text>
          <Text style={paragraph}>
            Velkommen til fotballdraktbutikken. Håper du blir fornøyd og send
            oss gjerne en melding om noe ikke lever opp til forventningene.{" "}
            {actionLabel}.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={href}>
              {buttonText}
            </Button>
          </Section>
          <Text style={paragraph}>
            Med vennlig hilsen,
            <br />
            Fotballdraktbutikken AS
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Hvis du ikke forventet denne mailen, kan du se vekk i fra den.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const PrimaryActionEmailHtml = (props: EmailTemplateProps) =>
  render(<EmailTemplate {...props} />, { pretty: true });

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  padding: "12px 12px",
  backgroundColor: "#2563eb",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
