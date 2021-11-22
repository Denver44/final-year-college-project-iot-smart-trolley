import React, { useEffect } from "react";
import "./dashboard.css";
import Checkout from "../checkout/Checkout";
import Header from "../Header/Header";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "AUTH",
          data: user,
        });
      } else {
        dispatch({
          type: "LOGOUT",
          data: null,
        });
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <Checkout />
    </div>
  );
}

export default Dashboard;
