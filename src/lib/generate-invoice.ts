import { Lesson, User } from "@prisma/client";
import { formatDate } from "date-fns/format";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Format date as "MMMM DD, YYYY"
function formatDateForPDF(date: Date): string {
  return formatDate(date, "MMMM dd, yyyy");
}

// Generate PDF
// Generate PDF
export async function generatePaymentPdf(
  user: User,
  subscription: { name: string; price: number },
  lessons: Lesson[],
  amount: number,
  paymentIntentId: string,
  invoiceId: string,
  discountAmount: number = 0 // Add a parameter for the discount amount (default is 0)
): Promise<Buffer> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size (8.5 x 11 inches)

  // Load a standard font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Define constants for layout
  const { width, height } = page.getSize();
  const margin = 40;
  const fontSize = 12;
  let currentY = height - margin;

  // Helper function to draw text
  function drawText(
    text: string,
    x: number,
    y: number,
    options: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      font?: any;
      size?: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color?: any;
      align?: "left" | "right";
    } = {}
  ) {
    const {
      font = helveticaFont,
      size = fontSize,
      color = rgb(0, 0, 0),
      align = "left",
    } = options;
    const textWidth = font.widthOfTextAtSize(text, size);
    const xPos = align === "right" ? x - textWidth : x;
    page.drawText(text, { x: xPos, y, size, font, color });
  }

  // Header section
  drawText("Invoice", margin, currentY, { font: helveticaBoldFont, size: 24 });
  drawText("Schaefer Tutor", width - margin, currentY, {
    align: "right",
  });
  currentY -= 30;

  // Invoice details
  drawText(`Invoice Number: ${invoiceId.substring(0, 15)}`, margin, currentY, {
    size: 11,
  });
  drawText(
    `Date of Issue: ${formatDateForPDF(new Date())}`,
    margin,
    currentY - 15,
    { size: 11 }
  );
  drawText(`Date Due: ${formatDateForPDF(new Date())}`, margin, currentY - 30, {
    size: 11,
  });
  currentY -= 50;

  // Billing details
  drawText(user.name as string, margin, currentY, { font: helveticaBoldFont });
  // drawText("United States", margin, currentY - 15);
  drawText("Bill To:", width / 2 + margin, currentY, {
    font: helveticaBoldFont,
  });
  drawText(user.email || "N/A", width / 2 + margin, currentY - 15);
  currentY -= 50;

  // Amount due
  drawText(
    `$${amount.toFixed(2)} USD Paid for ${lessons.length} lessons`,
    margin,
    currentY,
    { font: helveticaBoldFont, size: 16 }
  );
  currentY -= 30;

  // Lessons table
  const tableHeaders = ["Description", "Qty", "Unit Price", "Amount"];
  const tableRows = lessons.map((lesson) => {
    const lessonDate = new Date(lesson.date);
    return [
      `Lesson on ${formatDateForPDF(lessonDate)} (${lesson.time})`,
      "1",
      `$${subscription.price.toFixed(2)}`,
      `$${subscription.price.toFixed(2)}`,
    ];
  });

  const columnWidths = [300, 50, 100, 100];
  const rowHeight = 20;

  // Draw table headers
  tableHeaders.forEach((header, index) => {
    const x =
      margin + columnWidths.slice(0, index).reduce((sum, w) => sum + w, 0);
    drawText(header, x, currentY, { font: helveticaBoldFont, size: 10 });
  });
  currentY -= rowHeight;

  // Draw table rows
  tableRows.forEach((row) => {
    row.forEach((cell, index) => {
      const x =
        margin + columnWidths.slice(0, index).reduce((sum, w) => sum + w, 0);
      drawText(cell, x, currentY, { size: 10 });
    });
    currentY -= rowHeight;
  });

  // Subtotal, Discount, and Total section
  currentY -= 20;

  // Subtotal
  drawText("Subtotal", margin, currentY, { size: 10 });
  drawText(`$${amount.toFixed(2)}`, width - margin, currentY, {
    size: 10,
    align: "right",
  });
  currentY -= 15;

  // Discount (if applicable)
  if (discountAmount > 0) {
    drawText("Discount", margin, currentY, { size: 10 });
    drawText(`-$${discountAmount.toFixed(2)}`, width - margin, currentY, {
      size: 10,
      align: "right",
    });
    currentY -= 15;
  }

  // Total
  const totalAfterDiscount = amount - discountAmount;
  drawText("Total", margin, currentY, { size: 10 });
  drawText(`$${totalAfterDiscount.toFixed(2)}`, width - margin, currentY, {
    size: 10,
    align: "right",
  });
  currentY -= 15;

  // Amount Due
  drawText("Amount Due", margin, currentY, {
    font: helveticaBoldFont,
    size: 12,
  });
  drawText(`$${totalAfterDiscount.toFixed(2)} USD`, width - margin, currentY, {
    font: helveticaBoldFont,
    size: 12,
    align: "right",
  });
  currentY -= 30;

  // Footer section
  drawText(`Payment ID: ${paymentIntentId}`, margin, currentY, { size: 9 });
  drawText(`Subscription: ${subscription.name}`, margin, currentY - 10, {
    size: 9,
  });

  // Serialize the PDF to a buffer
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
