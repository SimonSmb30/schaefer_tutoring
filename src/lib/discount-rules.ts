// discountRules.ts
const rules = [
  {
    id: 1,
    minimumLesson: 8,
    minimumRecomendation: 1,
    discount: 25,
  },
];
export async function calculateDiscountBasedOnRules(
  totalRecomendation: number,
  totalLesson: number
): Promise<number> {
  // Sort rules by discount in descending order (higher discounts first)
  const sortedRules = [...rules].sort((a, b) => b.discount - a.discount);

  // Evaluate each rule in order and return the first matching discount
  for (const rule of sortedRules) {
    if (
      totalRecomendation >= rule.minimumRecomendation &&
      totalLesson >= rule.minimumLesson
    ) {
      return rule.discount; // Return the fixed discount amount
    }
  }

  // Default discount if no rules match
  return 0;
}
