import { prisma } from "@/lib/prisma";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Step 1: Fetch the payment record from the database
    const payment = await prisma.paymentHistory.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }

    const pdfUrl = payment.edgePdfUrl;

    if (!pdfUrl) {
      return NextResponse.json(
        { error: "PDF URL not available for this payment" },
        { status: 404 }
      );
    }

    // Step 2: Determine if the PDF is stored locally or remotely
    let fileContent: Buffer;
    let fileName: string;

    if (pdfUrl.startsWith("http")) {
      // Remote file: Fetch the PDF using fetch
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        return NextResponse.json(
          { error: "Failed to fetch the PDF file" },
          { status: response.status }
        );
      }

      // Convert the response to a buffer
      fileContent = Buffer.from(await response.arrayBuffer());
      fileName = path.basename(new URL(pdfUrl).pathname); // Extract file name from URL
    } else {
      // Local file: Read the PDF from the filesystem
      const filePath = path.resolve(pdfUrl); // Resolve the absolute path
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: "PDF file not found on the server" },
          { status: 404 }
        );
      }
      fileContent = fs.readFileSync(filePath);
      fileName = path.basename(filePath); // Extract file name from path
    }

    // Step 3: Set headers for file download
    const headers = {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    };

    // Step 4: Return the file content with headers
    return new NextResponse(fileContent, { headers });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the PDF" },
      { status: 500 }
    );
  }
}
