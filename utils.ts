// utils.ts
export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: "Starter" | "Main" | "Dessert";
  price: string;
};

// Calculate average prices per course
export function getAveragesByCourse(menuItems: MenuItem[]): Record<string, number> {
  const totals: Record<string, { total: number; count: number }> = {};

  for (const item of menuItems) {
    const course = item.course;
    const priceNum = parseFloat(item.price) || 0;

    if (!totals[course]) totals[course] = { total: 0, count: 0 };
    totals[course].total += priceNum;
    totals[course].count++;
  }

  const averages: Record<string, number> = {};
  for (const course in totals) {
    const { total, count } = totals[course];
    averages[course] = count > 0 ? total / count : 0;
  }

  return averages;
}
