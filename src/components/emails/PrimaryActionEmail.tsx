import * as React from "react";
import { Body, Button, Container, Head, Hr, Html, Img, Preview, render, Section, Text } from "@react-email/components";

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
  const logoUrl = "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/logo-5.png";

  return (
    <Html>
      <Head />
      <Preview>Din leverandør for skjedne fotballdrakter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={logoUrl}
            width="150"
            height="150"
            alt="Fotballdraktbutikken"
            style={logo}
          />
          <Text style={paragraph}>Hallayen </Text>
          <Text style={paragraph}>
            Velkommen til fdb.343. Håper du blir fornøyd og send
            oss gjerne en melding om noe ikke lever opp til forventningene.{" "}
            {actionLabel}. {" "}/{" "} Welcome to fdb.343. We hope you are satisfied, and please feel free to send us a message if something does not meet your expectations. {actionLabel}.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={href}>
              {buttonText}
            </Button>
          </Section>
          <Text style={paragraph}>
            Med vennlig hilsen {""} / {""} Best regards,
            <br />
            Fotballdraktbutikken AS
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Hvis du ikke forventet denne mailen, kan du se vekk i fra den.{""} / {""} If you did not expect this email, you can ignore it.
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