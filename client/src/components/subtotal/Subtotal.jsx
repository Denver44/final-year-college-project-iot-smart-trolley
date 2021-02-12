import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

function Subtotal({ total, basketlength }) {
  const history = useHistory();

  const replacewithThankyou = () => {
    history.replace("/thankyou");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className="subtotal__total">
              Subtotal ( <strong> {basketlength} </strong> items):{" "}
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This Order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={total} // The value is passed from here to
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={replacewithThankyou} className="btn">
        Pay Bill
      </button>
    </div>
  );
}

export default Subtotal;
