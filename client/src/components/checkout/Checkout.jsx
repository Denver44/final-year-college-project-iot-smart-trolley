import React, { useState, useEffect } from "react";
import "./Checkout.css";
import Subtotal from "../subtotal/Subtotal";
import CheckoutProduct from "../checkoutproduct/CheckoutProduct";
import ad from "../../images/ad.png";
import axios from "../../api/Axios.js";

function Checkout() {
  let [basket, setbasket] = useState([]);
  const [total, setTotal] = useState(0);
  // useMemo Setup
  async function fetchData() {
    const req = await axios.get("/cart");
    console.log(req.data);
    setbasket(req.data.rows);
    setTotal(req.data.totalprice);
  }

  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src={ad} alt="Amazon Ad" />
        <div>
          <p className="checkout__title"> Shopping Cart</p>
          {basket &&
            basket.map((product) => {
              return (
                <CheckoutProduct
                  key={product.cardID}
                  title={product.Name}
                  id={1}
                  price={product.Price}
                  rating={product.ratings}
                  img={product.image_path}
                />
              );
            })}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal
          total={basket ? total : 0}
          basketlength={basket ? basket.length : 0}
        />
      </div>
    </div>
  );
}

export default Checkout;
