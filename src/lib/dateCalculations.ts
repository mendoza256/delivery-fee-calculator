import { Days, RushHourType } from "./baseTypes";

const rushHourSchedule: RushHourType[] = [
  { dayOfWeek: Days.Friday, startHour: 15, endHour: 18 },
];

export function applyRushHourMultiplier(date: Date) {
  const orderDate = date;
  const orderDay = orderDate.getDay();
  const orderHour = orderDate.getHours();
  const rushHourMultiplier = 1.2;
  const noMuliplier = 1;

  const isRushHour = rushHourSchedule.some(
    (rushHour) =>
      rushHour.dayOfWeek === orderDay &&
      rushHour.startHour <= orderHour &&
      rushHour.endHour >= orderHour
  );

  return isRushHour ? rushHourMultiplier : noMuliplier;
}
