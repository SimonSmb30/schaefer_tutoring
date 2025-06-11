import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import * as ExcelJS from "exceljs";
import { Parser } from "json2csv";
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export const dynamic = "force-dynamic"; // Disable static generation
export const revalidate = 0; // Disable caching
export const fetchCache = "force-no-store"; // Always fetch fresh data

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const exportFormat = searchParams.get("format") || "csv";

    if (!from || !to) {
      return NextResponse.json(
        { error: "From and to dates are required" },
        { status: 400 }
      );
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Fetch lessons with related data
    const lessons = await prisma.lesson.findMany({
      where: {
        date: {
          gte: fromDate,
          lte: toDate,
        },
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Transform data for export
    const formattedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      date: format(lesson.date, "yyyy-MM-dd"),
      time: lesson.time,
      status: lesson.status,
      teacherName: lesson.teacher.name,
      teacherEmail: lesson.teacher.email,
      studentName: lesson.student.name,
      studentEmail: lesson.student.email,
      subject: lesson.subject.name,
      createdAt: format(lesson.createdAt, "yyyy-MM-dd HH:mm:ss"),
    }));

    // Handle different export formats
    switch (exportFormat) {
      case "csv":
        return handleCsvExport(formattedLessons);
      case "excel":
        return handleExcelExport(formattedLessons);
      case "pdf":
        return handlePdfExport(formattedLessons);
      default:
        return handleCsvExport(formattedLessons);
    }
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleCsvExport(data: any[]) {
  try {
    const fields = [
      //   "id",
      "date",
      "time",
      "status",
      "teacherName",
      "teacherEmail",
      "studentName",
      "studentEmail",
      "subject",
      //   "createdAt",
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="lessons-export-${format(
          new Date(),
          "yyyy-MM-dd"
        )}.csv"`,
      },
    });
  } catch (error) {
    console.error("CSV export error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSV" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleExcelExport(data: any[]) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Lessons");

    worksheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Time", key: "time", width: 10 },
      { header: "Status", key: "status", width: 15 },
      { header: "Teacher Name", key: "teacherName", width: 20 },
      { header: "Teacher Email", key: "teacherEmail", width: 25 },
      { header: "Student Name", key: "studentName", width: 20 },
      { header: "Student Email", key: "studentEmail", width: 25 },
      { header: "Subject", key: "subject", width: 20 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    // Add rows
    worksheet.addRows(data);

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="lessons-export-${format(
          new Date(),
          "yyyy-MM-dd"
        )}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Excel export error:", error);
    return NextResponse.json(
      { error: "Failed to generate Excel file" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePdfExport(data: any[]) {
  try {
    // Create a document
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    // Collect data chunks
    doc.on("data", (chunk) => buffers.push(chunk));

    // Add content to PDF
    doc.fontSize(16).text("Lessons Export", { align: "center" });
    doc.moveDown();

    // Add table headers
    const tableTop = 150;
    const headers = ["Date", "Time", "Status", "Teacher", "Student", "Subject"];

    let i;
    doc.fontSize(10);

    // Draw headers
    for (i = 0; i < headers.length; i++) {
      doc.text(headers[i], 50 + i * 90, tableTop, {
        width: 90,
        align: "center",
      });
    }

    // Draw horizontal line
    doc
      .moveTo(50, tableTop + 20)
      .lineTo(50 + headers.length * 90, tableTop + 20)
      .stroke();

    // Draw rows
    let rowTop = tableTop + 30;
    data.forEach((lesson) => {
      doc.text(lesson.date, 50, rowTop, { width: 90, align: "center" });
      doc.text(lesson.time, 140, rowTop, { width: 90, align: "center" });
      doc.text(lesson.status, 230, rowTop, { width: 90, align: "center" });
      doc.text(lesson.teacherName, 320, rowTop, { width: 90, align: "center" });
      doc.text(lesson.studentName, 410, rowTop, { width: 90, align: "center" });
      doc.text(lesson.subject, 500, rowTop, { width: 90, align: "center" });

      rowTop += 30;

      // Add a new page if we're at the bottom
      if (rowTop > 700) {
        doc.addPage();
        rowTop = 50;

        // Redraw headers on new page
        for (i = 0; i < headers.length; i++) {
          doc.text(headers[i], 50 + i * 90, rowTop, {
            width: 90,
            align: "center",
          });
        }

        // Draw horizontal line
        doc
          .moveTo(50, rowTop + 20)
          .lineTo(50 + headers.length * 90, rowTop + 20)
          .stroke();
        rowTop += 30;
      }
    });

    // Finalize the PDF
    doc.end();

    // Return a Promise that resolves with the complete PDF data
    return new Promise<NextResponse>((resolve) => {
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(
          new NextResponse(pdfBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="lessons-export-${format(
                new Date(),
                "yyyy-MM-dd"
              )}.pdf"`,
            },
          })
        );
      });
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF file" },
      { status: 500 }
    );
  }
}
