# Delivery Fee Calculation Service

This service calculates the delivery fee for an order based on several rules including cart value, number of items, delivery distance, and time of order.

## Rules for Calculating Delivery Fee

1. If the cart value is less than 10€, a small order surcharge is added to the delivery price.
2. A delivery fee for the first 1km is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters.
3. If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€.
4. The delivery fee can never be more than 15€, including possible surcharges.
5. The delivery is free (0€) when the cart value is equal or more than 200€.
6. During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).

## Running the project

Navigate to the project directory and run

```bash
npm install
```

## Running Tests

To run the tests, you will need to have Node.js and npm installed on your machine. You will also need Jest, a JavaScript testing framework. If you haven't installed Jest yet, you can do so by running the following command in your terminal:

```bash
npm install --save-dev jest
```
