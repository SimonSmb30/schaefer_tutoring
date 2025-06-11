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
import React from "react";

interface TutorMeetEmailProps {
  studentName: string;
  subject: string;
  teacherName: string;
  meetLink: string;
  date: string;
  time: string;
  additionalNotes?: string;
}

export const TutorMeetEmail: React.FC<TutorMeetEmailProps> = ({
  studentName = "Student",
  subject = "Mathematics",
  teacherName = "Ms. Johnson",
  meetLink = "https://meet.google.com/abc-defg-hij",
  date = "Monday, April 22, 2025",
  time = "4:00 PM - 5:00 PM EST",
  additionalNotes = "Please have your textbook and completed homework ready for our session.",
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your upcoming tutoring session with {teacherName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Upcoming Online Session Details</Heading>

          <Text style={paragraph}>Hello {studentName},</Text>

          <Text style={paragraph}>
            I hope this email finds you well. I&apos;m writing to confirm our
            upcoming online tutoring session.
          </Text>

          <Section style={sessionDetails}>
            <Text style={detailsHeading}>Session Details:</Text>
            <Text style={detailItem}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={detailItem}>
              <strong>Teacher:</strong> {teacherName}
            </Text>
            <Text style={detailItem}>
              <strong>Date:</strong> {date}
            </Text>
            <Text style={detailItem}>
              <strong>Time:</strong> {time}
            </Text>
            <Text style={detailItem}>
              <strong>Google Meet Link:</strong> {meetLink}
            </Text>
            <Button href={meetLink} style={button}>
              Join Meeting
            </Button>
          </Section>

          <Text style={paragraph}>
            To join the session, simply click on the button above or use the
            Google Meet link at the scheduled time.
          </Text>

          {additionalNotes && (
            <>
              <Text style={notesHeading}>Additional Notes:</Text>
              <Text style={paragraph}>{additionalNotes}</Text>
            </>
          )}

          <Text style={paragraph}>
            If you need to reschedule or have any questions, please let me know
            as soon as possible.
          </Text>

          <Text style={paragraph}>Looking forward to our session!</Text>

          <Text style={paragraph}>
            Best regards,
            <br />
            {teacherName}
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            This is an automated email. Please do not reply directly to this
            message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const sessionDetails = {
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  border: "1px solid #eaeaea",
  margin: "20px 0",
};

const detailsHeading = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 10px",
};

const detailItem = {
  margin: "0 0 8px",
  fontSize: "14px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  marginTop: "16px",
  padding: "20px",
};

const notesHeading = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "24px 0 8px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "16px",
};

export default TutorMeetEmail;
