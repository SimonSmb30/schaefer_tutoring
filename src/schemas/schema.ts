import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
  phone: z.string(),
  name: z.string(),
  role: z.enum(["student", "teacher"]),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name must be at least 2 characters"),
});
export type SubjectSchemaType = z.infer<typeof subjectSchema>;

export const teacherCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  password: z.string(),
  subjectids: z.string().nonempty("Please at least one item"),
});

export type TeacherCreateSchemaType = z.infer<typeof teacherCreateSchema>;

export const lessonCreateSchema = z.object({
  studentId: z.string({
    required_error: "Bitte wählen Sie einen Schüler aus",
  }),
  date: z.date({
    required_error: "Bitte wählen Sie ein Datum aus",
  }),
  time: z.string({
    required_error: "Bitte wählen Sie eine Startzeit aus",
  }),
  subject: z.string(),
});

export type LessonCreateSchema = z.infer<typeof lessonCreateSchema>;

export const StudentProfileSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});
export const teacherProfileSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  subjects: z.array(z.string()),
});

export type StudentProfileSchemaType = z.infer<typeof StudentProfileSchema>;

export type TeacherProfileSchemaType = z.infer<typeof teacherProfileSchema>;

const dateTimeSchema = z.object({
  date: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a date.",
    }),
  time: z.string({
    required_error: "Please select a preferred time.",
  }),
});

export const freeTrialSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  // Array of date-time pairs
  preferredSlots: z.array(dateTimeSchema).min(1, {
    message: "Please add at least one preferred date and time.",
  }),
  notes: z.string().optional(),
});

export type FreeTrialSchemaType = z.infer<typeof freeTrialSchema>;

export const pricingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a number",
  }),
  description: z.string(),
  isRecommended: z.boolean().optional(),
  features: z.array(z.string()),
});

export type PricingFormValues = z.infer<typeof pricingSchema>;

const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of the current year
const currentMonth = new Date().getMonth() + 1;

export const paymentCardSchema = z
  .object({
    cardholderName: z
      .string()
      .min(2, { message: "Cardholder name is required" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Cardholder name must contain only letters and spaces",
      }),

    cardNumber: z
      .string()
      .regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),

    expiryMonth: z
      .string()
      .regex(/^(0?[1-9]|1[0-2])$/, { message: "Invalid expiry month" }),

    expiryYear: z
      .string()
      .regex(/^\d{2}$/, { message: "Invalid expiry year format" })
      .refine((year) => parseInt(year) >= currentYear, {
        message: "Card is expired",
      }),

    cvc: z
      .string()
      .regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits" }),
  })
  .refine(
    (data) => {
      // Check if the expiry date is in the future
      const expYear = parseInt(data.expiryYear);
      const expMonth = parseInt(data.expiryMonth);

      if (expYear === currentYear) {
        return expMonth >= currentMonth;
      }
      return true;
    },
    {
      message: "Card is expired",
      path: ["expiryMonth"],
    }
  );

export type PaymentCardSchemaType = z.infer<typeof paymentCardSchema>;
