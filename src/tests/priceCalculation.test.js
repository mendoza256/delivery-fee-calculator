import { describe, expect, it } from "@jest/globals";

import {
  calculateDeliveryFees,
  applyMinCharge,
  applyBulkFee,
  isFreeDelivery,
  calcDeliveryFee,
} from "../lib/priceCalculations";
import { Euros } from "../lib/baseTypes";

describe("calculateDeliveryFees", () => {
  it("should return 0 if free delivery is applicable", () => {
    const orderData = {
      cartValue: 200,
      itemAmount: 5,
      deliveryDistance: 10,
      time: new Date(),
    };
    expect(calculateDeliveryFees(orderData)).toBe(0);
  });

  it("should calculate fees correctly without rush hour", () => {
    const orderData = {
      cartValue: 50,
      itemAmount: 5,
      deliveryDistance: 1500,
      time: new Date("2024-01-01T10:00:00"),
    };

    const expectedFees =
      applyMinCharge(orderData.cartValue) +
      applyBulkFee(orderData.itemAmount) +
      calcDeliveryFee(orderData.deliveryDistance);
    expect(calculateDeliveryFees(orderData)).toBe(expectedFees);
  });

  it("should calculate fees correctly with rush hour", () => {
    const orderData = {
      cartValue: 50,
      itemAmount: 5,
      deliveryDistance: 1500,
      time: new Date("2022-01-01T18:00:00"), // Assuming this time falls in rush hour
    };
    // Replace with the expected value based on your fee calculation logic
    const expectedFees =
      (applyMinCharge(orderData.cartValue) +
        applyBulkFee(orderData.itemAmount) +
        calcDeliveryFee(orderData.deliveryDistance)) *
      1.2;
    expect(calculateDeliveryFees(orderData)).toBe(expectedFees);
  });

  it("should not exceed maximum delivery fee", () => {
    const orderData = {
      cartValue: 10, // Assuming this value doesn't qualify for free delivery
      itemAmount: 20,
      deliveryDistance: 5000,
      time: new Date("2022-01-01T18:00:00"), // Assuming this time falls in rush hour
    };
    expect(calculateDeliveryFees(orderData)).toBe(Euros.Fifteen);
  });

  it("should return true if free delivery is applicable", () => {
    const orderData = {
      cartValue: 200,
      itemAmount: 5,
      deliveryDistance: 10,
      time: new Date(),
    };
    expect(isFreeDelivery(orderData)).toBe(true);
  });
});
