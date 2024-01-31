import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { calculateDeliveryFees } from "../lib/priceCalculations";
import { toCents, toEuros } from "../lib/utils";

export type OrderData = {
  cartValue: number;
  deliveryDistance: number;
  itemAmount: number;
  time: Date;
};

const DeliveryFeeCalculator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);
  const { register, handleSubmit, watch } = useForm<OrderData>();
  const onSubmit = (formData: OrderData) => {
    setDeliveryPrice(
      calculateDeliveryFees({
        ...formData,
        time: startDate,
        cartValue: toCents(formData.cartValue),
      })
    );
  };

  const isFreeDelivery = watch("cartValue") >= 200;

  return (
    <div>
      <h1>Delivery Fee Calculator</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="cartValue" className="relative">
          <span>Cart Value</span>
          <input
            type="number"
            id="cartValue"
            {...register("cartValue", { required: true, min: 1 })}
          />
          <span className="ml-2 absolute right-6 text-grey">€</span>
        </label>
        {isFreeDelivery && <p className="free-delivery">Free Delivery!</p>}
        <label htmlFor="deliveryDistance" className="relative">
          <span>Delivery Distance</span>
          <input
            type="number"
            id="deliveryDistance"
            {...register("deliveryDistance", { required: true, max: 10000 })}
          />
          <span className="ml-2 absolute right-6 text-grey">m</span>
        </label>
        <label htmlFor="itemAmount" className="relative">
          <span>Amount of items</span>
          <input
            type="number"
            id="itemAmount"
            {...register("itemAmount", { required: true, min: 1 })}
          />
        </label>
        <label htmlFor="time" className="relative">
          <span>Time</span>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
          />
        </label>

        <button type="submit">Calculate Delivery Price</button>
      </form>
      <div className="delivery-price mt-4">
        {deliveryPrice !== null ? (
          <>
            <span>Delivery Price: {toEuros(deliveryPrice)} </span>
            <span>€</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DeliveryFeeCalculator;
