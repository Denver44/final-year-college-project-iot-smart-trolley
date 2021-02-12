import React from "react";
import "./dashboard.css";
import Checkout from "../checkout/Checkout";
import Header from "../Header/Header";
function dashboard() {
  return (
    <div>
      <Header />
      <Checkout />
    </div>
  );
}

export default dashboard;
