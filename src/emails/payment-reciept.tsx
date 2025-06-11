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
import type * as React from "react";

interface PaymentReceiptEmailProps {
  studentName?: string;
  month?: string;
  year?: string;
  lessonCount?: number;
  unitPrice?: number;
  discount?: number;
  total?: number;
  receiptUrl?: string;
}

export const PaymentReceiptEmail: React.FC<PaymentReceiptEmailProps> = ({
  studentName = "Alex",
  month = "April",
  year = "2025",
  lessonCount = 10,
  unitPrice = 20,
  discount = 25,
  total = 175,
  receiptUrl = "https://schaefertutor.com/receipts/123456",
}) => {
  const subtotal = lessonCount * unitPrice;

  return (
    <Html>
      <Head />
      <Preview>
        Your Schaefer Tutor Payment Receipt for {month} {year}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={header}>Schaefer Tutor</Heading>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={paragraph}>Dear {studentName},</Text>
            <Text style={paragraph}>
              Thank you for choosing Schaefer Tutor for your educational
              journey. This email confirms your payment for tutoring services in{" "}
              {month} {year}.
            </Text>
            <Text style={paragraph}>
              Last month, you completed {lessonCount} lessons on the Schaefer
              Tutor platform. Here&apos;s a summary of your charges:
            </Text>

            <Section style={tableContainer}>
              {/* Using HTML table elements instead of React Email components */}
              <table style={table} cellPadding="0" cellSpacing="0" width="100%">
                <thead>
                  <tr>
                    <th colSpan={3} style={tableHeader}>
                      Payment Summary
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tableCell}>Total Lessons</td>
                    <td style={tableCell}>
                      {lessonCount} lessons × ${unitPrice}.00
                    </td>
                    <td style={tableCellRight}>${subtotal}.00</td>
                  </tr>
                  <tr>
                    <td style={tableCell}>Discount</td>
                    <td style={tableCell}></td>
                    <td style={tableCellRight}>-${discount}.00</td>
                  </tr>
                  <tr>
                    <td style={tableCellTotal} colSpan={2}>
                      Total
                    </td>
                    <td style={tableCellTotalAmount}>${total}.00</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Text style={paragraph}>
              To download a copy of your receipt for your records, please click
              the button below:
            </Text>

            <Button href={receiptUrl} style={button}>
              Download Receipt
            </Button>

            <Text style={paragraph}>
              If you have any questions about your charges or would like to
              discuss your tutoring plan, please don&aposs;t hesitate to contact
              our support team at support@schaefertutor.com.
            </Text>

            <Text style={paragraph}>
              Thank you for your continued trust in Schaefer Tutor.
            </Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              The Schaefer Tutor Team
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            © 2025 Schaefer Tutor. All rights reserved.
            <br />
            123 Education Lane, Learning City, ED 12345
            <br />
            <br />
            This receipt was automatically generated. Please do not reply to
            this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentReceiptEmail;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const section = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
};

const tableContainer = {
  margin: "30px 0",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const tableHeader = {
  backgroundColor: "#f0f0f0",
  padding: "12px 15px",
  fontSize: "16px",
  fontWeight: "bold",
  borderBottom: "1px solid #ddd",
  textAlign: "left" as const,
};

const tableCell = {
  padding: "12px 15px",
  borderBottom: "1px solid #ddd",
  fontSize: "15px",
  textAlign: "left" as const,
};

const tableCellRight = {
  padding: "12px 15px",
  borderBottom: "1px solid #ddd",
  fontSize: "15px",
  textAlign: "right" as const,
};

const tableCellTotal = {
  padding: "12px 15px",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "right" as const,
  borderTop: "2px solid #ddd",
};

const tableCellTotalAmount = {
  padding: "12px 15px",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "right" as const,
  borderTop: "2px solid #ddd",
};

const button = {
  backgroundColor: "#4F46E5",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 20px",
  margin: "30px auto",
  width: "200px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "22px",
  textAlign: "center" as const,
  margin: "20px 0",
};
