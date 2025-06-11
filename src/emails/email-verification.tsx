import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailVerificationProps {
  username?: string;
  verificationUrl?: string;
}

const baseUrl = process.env.AUTH_URL ? `https://${process.env.AUTH_URL}` : "";

export const EmailVerification = ({
  username = "Simon",
  verificationUrl = `${baseUrl}/verify-email`,
}: EmailVerificationProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: "#007291",
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Verify your email address to complete your registration
        </Preview>
        <Container style={container}>
          <Container className="w-full flex justify-center">
            <Img
              src={`https://res.cloudinary.com/dgnustmny/image/upload/v1745722360/Email_Icon_lk31sc.png`}
              width="62"
              height="52"
              alt="Email Verification"
            />
          </Container>

          <Text className="text-center text-[28px] font-semibold">
            Verify your email address
          </Text>
          <Text className="text-center text-[16px] font-semibold">
            Welcome to schaefer-tutoring.com
          </Text>

          <Section style={section}>
            <Text style={text}>
              Hey <strong>{username}</strong>!
            </Text>
            <Text style={text}>
              Thank you for signing up! To complete your registration, please
              verify your email address by clicking the button below.
            </Text>

            <Button
              href={verificationUrl}
              style={button}
              className="mt-5 bg-blue-500"
            >
              Verify Email Address
            </Button>
          </Section>
          <Text style={links}>
            <Link href={`${baseUrl}/support`} style={link}>
              Contact support
            </Link>
          </Text>

          <Text style={footer}>
            If you did not sign up for this account, you can safely ignore this
            email.
          </Text>
          <Text style={footer}>
            Schaefer Tutor ・123 Example Street ・City, State 12345
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

EmailVerification.PreviewProps = {
  username: "johndoe",
  verificationUrl: "https://example.com/verify-email",
} as EmailVerificationProps;

export default EmailVerification;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const section = {
  padding: "24px",
  paddingLeft: "20px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  // backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
