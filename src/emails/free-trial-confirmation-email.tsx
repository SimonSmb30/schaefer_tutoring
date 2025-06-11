import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface FreeTrialConfirmationEmailProps {
  studentName: string;
  teacherName: string;
  teacherImageUrl: string;
  teacherSubject: string;
  sessionDate: string;
  sessionTime: string;
  sessionSubject: string;
  confirmationLink: string;
}

export const FreeTrialConfirmationEmail = ({
  studentName = "Alex",
  teacherName = "Ms. Johnson",
  teacherImageUrl = "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg",
  teacherSubject = "Mathematics Expert",
  sessionDate = "Monday, April 21, 2025",
  sessionTime = "4:00 PM - 5:00 PM",
  sessionSubject = "Mathematics",
  confirmationLink = "https://schaefertutor.com/confirm/session123",
}: FreeTrialConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Your Free Trial Session with Schaefer Tutor has been approved!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={logoContainer}>
            <Heading style={header}>Schaefer Tutor</Heading>
          </Section>

          <Section style={section}>
            {/* Main Content */}
            <Text style={greeting}>Hey {studentName},</Text>
            <Text style={paragraph}>
              Great news! We&apos;ve found the perfect teacher for your free
              trial session.
            </Text>

            {/* Teacher Profile Section */}
            <Section style={teacherProfileContainer}>
              <Row>
                <Column style={teacherImageColumn}>
                  <Img
                    src={teacherImageUrl}
                    width="120"
                    height="120"
                    alt={`${teacherName}'s profile`}
                    style={teacherImage}
                  />
                </Column>
                <Column style={teacherInfoColumn}>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                    }}
                  >
                    {teacherName}
                  </Text>
                  <Text style={teacherSpecialty}>{teacherSubject}</Text>
                  <Text style={teacherBio}>
                    Your teacher is excited to meet you and help you excel in{" "}
                    {sessionSubject}.
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Session Details */}
            <Section style={detailsContainer}>
              <Text style={detailHeading}>Session Details</Text>
              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Date:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{sessionDate}</Text>
                </Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Time:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{sessionTime}</Text>
                </Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Subject:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{sessionSubject}</Text>
                </Column>
              </Row>
            </Section>

            <Text style={paragraph}>
              Please confirm your attendance by clicking the button below:
            </Text>

            <Button href={confirmationLink} style={button}>
              Confirm Attendance
            </Button>

            <Text style={paragraph}>
              If you have any questions or need to reschedule, please reply to
              this email or call us at (555) 123-4567.
            </Text>

            <Text style={paragraph}>
              We&apos;re looking forward to helping you achieve your academic
              goals!
            </Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              The Schaefer Tutor Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerContainer}>
            <Text style={footer}>
              © 2025 Schaefer Tutor. All rights reserved.
              <br />
              123 Education Lane, Learning City, ED 12345
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default FreeTrialConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#f8f9fa",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  color: "#333",
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const logoContainer = {
  backgroundColor: "#0366d6",
  padding: "20px 0",
  borderRadius: "8px 8px 0 0",
  marginBottom: "0",
};

const header = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "10px 0",
};

const section = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "0 0 8px 8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const greeting = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "15px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#444",
  margin: "16px 0",
};

const teacherProfileContainer = {
  margin: "25px 0",
  padding: "20px",
  backgroundColor: "#f0f4ff",
  borderRadius: "8px",
  border: "1px solid #e0e7ff",
};

const teacherImageColumn = {
  width: "130px",
  verticalAlign: "top",
};

const teacherInfoColumn = {
  paddingLeft: "15px",
  verticalAlign: "top",
};

const teacherImage = {
  borderRadius: "60px",
  border: "3px solid #ffffff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const teacherSpecialty = {
  fontSize: "14px",
  color: "#6c5ce7",
  margin: "0 0 10px 0",
};

const teacherBio = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#555",
  margin: "0",
};

const detailsContainer = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "8px",
  margin: "25px 0",
  border: "1px solid #eee",
};

const detailHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px",
  color: "#333",
  borderBottom: "1px solid #eee",
  paddingBottom: "8px",
};

const detailRow = {
  margin: "8px 0",
};

const detailLabelColumn = {
  width: "80px",
};

const detailValueColumn = {
  width: "auto",
};

const detailLabel = {
  fontWeight: "bold",
  fontSize: "15px",
  color: "#555",
  margin: "0",
};

const detailValue = {
  fontSize: "15px",
  color: "#333",
  margin: "0",
};

const button = {
  backgroundColor: "#0366d6",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 20px",
  margin: "30px auto",
  width: "220px",
  boxShadow: "0 2px 5px rgba(108, 92, 231, 0.3)",
};

const footerContainer = {
  margin: "20px 0 0 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "22px",
  textAlign: "center" as const,
  margin: "10px 0",
};
