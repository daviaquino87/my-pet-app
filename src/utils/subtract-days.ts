import { subDays } from "date-fns";

export function subtractDays(date: Date, days: number) {
  return subDays(date, 7);
}
