import { OrderType, Days, RushHourType } from "./baseTypes";

// If the cart value is less than 10€, a small order surcharge is added to the delivery price.
// The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
// A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional
// 500 meters that the courier needs to travel before reaching the destination.
// Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.

// Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
// Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
// Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€

// If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item.
// An extra "bulk" fee applies for more than 12 items of 1,20€

// Example 1: If the number of items is 4, no extra surcharge
// Example 2: If the number of items is 5, 50 cents surcharge is added
// Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
// Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
// Example 5: If the number of items is 14, 6,20€ surcharge is added ((10 * 50 cents) + 1,20€)

// The delivery fee can never be more than 15€, including possible surcharges.

const rushHourSchedule: RushHourType[] = [
  { dayOfWeek: Days.Friday, startHour: 15, endHour: 19 },
  { dayOfWeek: Days.Saturday, startHour: 14, endHour: 20 },
];

export default function calculateOrderBasePrice(order: OrderType) {
  const orderBasePrice = order.reduce((acc, item) => acc + item.price, 0);
  return orderBasePrice;
}

export function applyMinCharge(orderBasePrice: number) {
  const minimumCharge = 1000;
  const surcharge = minimumCharge - orderBasePrice;

  return orderBasePrice < minimumCharge ? surcharge : 0;
}

export function calcBulkFee(order: OrderType) {
  const bulkFeeAmount = 12;
  const freeItemsAmount = 4;
  if (order.length >= bulkFeeAmount) {
    return (order.length - freeItemsAmount) * 50 + 120;
  } else if (order.length >= freeItemsAmount) {
    return (order.length - freeItemsAmount) * 50;
  } else {
    return 0;
  }
}

export function isFreeDelivery(total: number) {
  const freeDeliveryThreshold = 20000;
  return total < freeDeliveryThreshold;
}

export function applyRushHourFee() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();

  const isRushHour = rushHourSchedule.some(
    (rushHour) =>
      rushHour.dayOfWeek === currentDay &&
      rushHour.startHour <= currentHour &&
      rushHour.endHour >= currentHour
  );

  return isRushHour ? 1.2 : 1;
}

export function withAppliedFees(order: OrderType) {
  if (order.length <= 0) return;

  const orderBasePrice = calculateOrderBasePrice(order);
  if (isFreeDelivery(orderBasePrice)) {
    return orderBasePrice;
  } else {
    return orderBasePrice * applyRushHourFee() + calcBulkFee(order);
  }
}
