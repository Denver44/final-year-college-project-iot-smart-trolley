import React from "react";
import Header from "../Header/Header";
import "./Thankyou.css";
import { useHistory } from "react-router-dom";

function Thankyou() {
  const history = useHistory();

  const replaceme = () => {
    history.replace("/");
  };

  return (
    <div className="thankyou">
      <Header />

      <div className="thankyou__text">
        <p> Thanks for Shopping. </p>
      </div>

      <div className="thankyou__button">
        <button onClick={replaceme} className="thankyoubtn">
          Go back to login page
        </button>
      </div>
    </div>
  );
}

export default Thankyou;
