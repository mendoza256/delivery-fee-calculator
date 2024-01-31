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
      cartValue: 20000,
      itemAmount: 5,
      deliveryDistance: 10,
      time: new Date(),
    };
    expect(calculateDeliveryFees(orderData)).toBe(0);
  });
});

describe("rushHourFee", () => {
  it("should calculate fees correctly without rush hour", () => {
    const orderData = {
      cartValue: 5000,
      itemAmount: 5,
      deliveryDistance: 1500,
      time: new Date("2024-01-25T10:00:00"),
    };

    const expectedFees =
      applyMinCharge(orderData.cartValue) +
      applyBulkFee(orderData.itemAmount) +
      calcDeliveryFee(orderData.deliveryDistance);
    expect(calculateDeliveryFees(orderData)).toBe(expectedFees);
  });

  it("should calculate fees correctly with rush hour", () => {
    const orderData = {
      cartValue: 5000,
      itemAmount: 5,
      deliveryDistance: 1500,
      time: new Date("2024-01-26T18:00:00"),
    };

    const expectedFees =
      (applyMinCharge(orderData.cartValue) +
        applyBulkFee(orderData.itemAmount) +
        calcDeliveryFee(orderData.deliveryDistance)) *
      1.2;
    expect(calculateDeliveryFees(orderData)).toBe(expectedFees);
  });
});

describe("isFreeDelivery", () => {
  it("should return true if free delivery is applicable", () => {
    const orderData = {
      cartValue: 20000,
      itemAmount: 5,
      deliveryDistance: 10,
      time: new Date(),
    };
    expect(isFreeDelivery(orderData.cartValue)).toBe(true);
  });
});

describe("doesNotExceedMaxFee", () => {
  it("should not exceed maximum delivery fee", () => {
    const orderData = {
      cartValue: 1000,
      itemAmount: 20,
      deliveryDistance: 9000,
      time: new Date("2024-01-26T18:00:00"),
    };
    expect(calculateDeliveryFees(orderData)).toBe(Euros.Fifteen);
  });
});
