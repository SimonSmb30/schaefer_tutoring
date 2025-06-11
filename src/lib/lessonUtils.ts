import { Lesson } from "@prisma/client";
import { DateTime } from "luxon"; // Luxon is used for robust date-time handling

/**
 * Filters lessons into two categories:
 * 1. Lessons happening today (`isToday`)
 * 2. Lessons that have already occurred in the past (`pastHours`)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterLessonsByPasthours(lessons: any[]) {
  const now = DateTime.now(); // Current date and time
  const today = now.startOf("day"); // Start of today (midnight)

  const isToday: Lesson[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pastHours: any[] = [];

  lessons.forEach((lesson) => {
    // Parse the lesson's date and time
    const lessonDate = DateTime.fromJSDate(lesson.date); // Convert Date to Luxon DateTime
    const [time, modifier] = lesson.time.split(" "); // e.g., "8:00 AM" -> ["8:00", "AM"]
    const [hours, minutes] = time.split(":").map(Number); // e.g., "8:00" -> [8, 0]

    // Convert lesson time to 24-hour format
    let hour24 = hours;
    if (modifier === "PM" && hours !== 12) {
      hour24 += 12; // Convert PM to 24-hour format
    } else if (modifier === "AM" && hours === 12) {
      hour24 = 0; // Midnight case
    }

    // Combine lesson date and time into a single DateTime object
    const lessonDateTime = lessonDate.set({ hour: hour24, minute: minutes });

    // Check if the lesson is today
    if (lessonDate.hasSame(today, "day")) {
      // If the lesson is today, check if it's in the past
      if (lessonDateTime < now) {
        pastHours.push(lesson);
      } else {
        isToday.push(lesson);
      }
    }
  });

  return { isToday, pastHours };
}

export function isPastDateAndTime(date: Date, time: string): boolean {
  const now = DateTime.now(); // Current date and time

  // Parse the given date into a Luxon DateTime object
  const givenDate = DateTime.fromJSDate(date);

  // Split the time string into components
  const [timePart, modifier] = time.split(" "); // e.g., "8:00 AM" -> ["8:00", "AM"]
  const [hours, minutes] = timePart.split(":").map(Number); // e.g., "8:00" -> [8, 0]

  // Convert the time to 24-hour format
  let hour24 = hours;
  if (modifier === "PM" && hours !== 12) {
    hour24 += 12; // Convert PM to 24-hour format
  } else if (modifier === "AM" && hours === 12) {
    hour24 = 0; // Midnight case
  }

  // Combine the given date and time into a single DateTime object
  const givenDateTime = givenDate.set({ hour: hour24, minute: minutes });

  // Compare the given date and time with the current date and time
  return givenDateTime < now;
}
