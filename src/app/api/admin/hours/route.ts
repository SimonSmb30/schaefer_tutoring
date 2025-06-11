import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") as $Enums.LessonStatus & "all";

    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10);

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Get total count for pagination
    const totalCount = await prisma.lesson.count({
      where: {
        status: status === "all" ? undefined : status,
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

    // Fetch hours with related teacher and pupil data
    const hours = await prisma.lesson.findMany({
      where: {
        status: status === "all" ? undefined : status,
      },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
        student: {
          select: {
            name: true,
          },
        },
        subject: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      skip: skip,
      take: pageSize,
    });

    // all,

    return NextResponse.json({
      hours,
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching hours:", error);
    return NextResponse.json(
      { error: "Failed to fetch hours" },
      { status: 500 }
    );
  }
}
