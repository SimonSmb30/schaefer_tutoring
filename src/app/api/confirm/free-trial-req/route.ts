import TutorMeetEmail from "@/emails/tutor-meet-email";
import { nylas } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

// This handles GET requests to /api/request/[reqId]
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reqId = searchParams.get("reqId");

  // Validate reqId
  if (!reqId || typeof reqId !== "string" || reqId.length < 3) {
    return NextResponse.json(
      { error: "Invalid reqId parameter" },
      { status: 400 }
    );
  }

  const freeTrialReq = await prisma.freeTrialReq.findFirst({
    where: {
      id: reqId,
    },
  });

  if (!freeTrialReq || !freeTrialReq.date || !freeTrialReq.time) {
    return NextResponse.json(
      { error: `No request found with id ${reqId}` },
      { status: 404 }
    );
  }

  const teacherId = freeTrialReq.teacherId;
  const teacherInfos = await prisma.user.findFirst({
    where: {
      id: teacherId as string,
    },
  });

  if (!teacherInfos || !teacherInfos?.grantId || !teacherInfos?.grantEmail) {
    return NextResponse.json(
      { error: `No teacher found with id ${teacherId}` },
      { status: 404 }
    );
  }

  // Convert date and time to a proper Unix timestamp
  const baseDate = new Date(freeTrialReq.date); // already a valid Date object
  const [hours, minutes] = freeTrialReq.time.split(":").map(Number);

  baseDate.setUTCHours(hours, minutes, 0, 0); // use setUTCHours for UTC-safe manipulation

  const startTime = Math.floor(baseDate.getTime() / 1000); // in seconds
  const endTime = startTime + 60 * 30; // 30 minutes later

  console.log({ startTime, endTime });

  const event = await nylas.events.create({
    identifier: teacherInfos.grantId as string,
    requestBody: {
      title: `Free Trial Lesson with ${freeTrialReq.fullName}`,
      description: `This is a 30-minute free trial session between ${freeTrialReq.fullName} and ${teacherInfos.name}.
    Feel free to prepare any questions or topics in advance. Looking forward to meeting you!`,
      when: {
        startTime: startTime, // ✅ Correct key
        endTime: endTime, // ✅ Correct key
      },
      conferencing: {
        autocreate: {},
        provider: "Google Meet",
      },
      participants: [
        {
          name: freeTrialReq.fullName,
          email: freeTrialReq.studentEmail,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: teacherInfos.grantEmail as string,
      notifyParticipants: true,
    },
  });

  if (!event) {
    return NextResponse.json(
      { error: `Failed to generate a google meet link` },
      { status: 500 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conf: any = event.data.conferencing;
  const meetingLink = conf.details.url;

  try {
    // save meeting link on free trial req
    await prisma.freeTrialReq.update({
      where: {
        id: freeTrialReq.id,
      },
      data: {
        meetingLink: meetingLink,
        status: "confirmed",
      },
    });
    // save calender link on the teacher infos

    if (!teacherInfos.calendarLink) {
      await prisma.user.update({
        where: {
          id: teacherInfos.id,
        },
        data: {
          calendarLink: event.data.htmlLink,
        },
      });
    }

    // send email to the student
    await resend.emails.send({
      from: "Schaefer Tutor <support@schaefer-tutoring.com>",
      to: [freeTrialReq.studentEmail],
      subject: "Your Free Trial Session with Schaefer Tutor",
      react: TutorMeetEmail({
        studentName: freeTrialReq.fullName,
        teacherName: teacherInfos.name as string,
        date: moment(freeTrialReq.date).format("D MMMM, YYYY") ?? new Date(),
        time: freeTrialReq.time,
        subject: freeTrialReq.subject,
        meetLink: meetingLink,
      }),
    });

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/success/${freeTrialReq.id}`
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Something went wrong` },
      { status: 404 }
    );
  }
}
