import { OrderData } from "../components/DeliveryFeeCalculator";
import { Euros, Cents, Distance } from "./baseTypes";
import { applyRushHourMultiplier } from "./dateCalculations";

export function applyMinCharge(cartValue: number) {
  const minimumCharge = Euros.Ten;
  const surcharge = minimumCharge - cartValue;

  return cartValue < minimumCharge ? surcharge : 0;
}

export function applyBulkFee(itemsAmount: number) {
  const bulkItemsAmount = 12;
  const freeItemsAmount = 4;
  const extraPricePerItem = Cents.Fifty;
  const bulkFee = Euros.OneTwenty;

  if (itemsAmount >= bulkItemsAmount) {
    return (itemsAmount - freeItemsAmount) * extraPricePerItem + bulkFee;
  } else if (itemsAmount >= freeItemsAmount) {
    return (itemsAmount - freeItemsAmount) * Euros.OneTwenty;
  } else {
    return 0;
  }
}

export function isFreeDelivery(orderPrice: number) {
  const freeDeliveryThreshold = Euros.TwoHundred;
  return orderPrice >= freeDeliveryThreshold;
}

export function calcDeliveryFee(distance: number) {
  const basePrice = Euros.Two;
  const HalfKmPrice = Euros.One;

  if (distance < Distance.OneKm) return basePrice;

  return Math.ceil((distance - Distance.OneKm) / 500) * HalfKmPrice + basePrice;
}

export function calculateDeliveryFees({
  cartValue,
  itemAmount,
  deliveryDistance,
  time,
}: OrderData): number {
  if (isFreeDelivery(cartValue)) return 0;
  const verifiedTime = time || new Date();

  const calculatedFees =
    applyMinCharge(cartValue) +
    applyBulkFee(itemAmount) +
    calcDeliveryFee(deliveryDistance);

  const withRushHourFee =
    calculatedFees * applyRushHourMultiplier(verifiedTime);

  if (withRushHourFee >= Euros.Fifteen) {
    return Euros.Fifteen;
  } else {
    return withRushHourFee;
  }
}
