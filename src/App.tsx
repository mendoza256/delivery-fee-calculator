import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import calculateTotal, { applyMinCharge } from "./lib/priceCalculations";
import { toEuros } from "./lib/utils";
import { MinimumFee } from "./lib/baseTypes";

type PriceAndFeesType = {
  orderBasePrice: number;
  minimum: number;
  delivery: number;
  bulk: number;
};

function App() {
  const [distance, setDistance] = useState(0);
  const currency = "€";
  const ORDER = [
    { name: "Burger", price: 590 },
    { name: "Fries", price: 290 },
  ];
  const totalPrice = calculateTotal(ORDER);
  const fees = {
    delivery: 150,
    minimum: MinimumFee.TenEuros - totalPrice,
  };
  const [priceAndFees, setPriceAndFees] = useState<PriceAndFeesType>({
    orderBasePrice: calculateTotal(ORDER),
    minimum: 0,
    delivery: 0,
    bulk: 0,
  });

  return (
    <>
      <ul className="orderSummary">
        {ORDER.map((item) => (
          <li className="item">
            <span>{item.name} </span>
            <span>
              {toEuros(item.price)} {currency}
            </span>
          </li>
        ))}
        <li className="feeAndPrice">
          <span>Items Price:</span>{" "}
          <span>
            {toEuros(priceAndFees.orderBasePrice)} {currency}
          </span>
        </li>
        <li className="feeAndPrice">
          <span>Minimum fee:</span>{" "}
          <span>
            {fees.delivery} {currency}
          </span>
        </li>
        <li className="feeAndPrice">
          <span>Delivery Fee:</span> <span>3,00 €</span>
        </li>
        <li className="feeAndPrice">
          <span>Total + Fees:</span>{" "}
          <span>
            {toEuros(priceAndFees.orderBasePrice)} {currency}
          </span>
        </li>
      </ul>
      <form
        className=""
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setDistance(e.target.distance.value);
        }}
      >
        <label htmlFor="distance">Distance</label>
        <input type="number" name="distance" id="distance" />
        <button type="submit">Submit</button>
      </form>
      {distance ? <div>Distance: {distance}</div> : null}
    </>
  );
}

export default App;
