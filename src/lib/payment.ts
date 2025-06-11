import { getAllRecomendationByStudentId } from "@/data/user";
import { calculateDiscountBasedOnRules } from "./discount-rules";

interface Props {
  studentId: string;
  totalLesson: number;
}

export async function calculateDiscount({
  studentId,
  totalLesson,
}: Props): Promise<number> {
  // Fetch total recommendations for the student
  const totalRecomendation = await getAllRecomendationByStudentId(studentId);

  // Delegate discount calculation to the rules module
  return calculateDiscountBasedOnRules(totalRecomendation, totalLesson);
}
