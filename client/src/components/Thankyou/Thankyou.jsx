import React from "react";
import Header from "../Header/Header";
import "./Thankyou.css";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";

function Thankyou() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const logout = () => {
    if (user.authData) {
      auth.signOut();
    }
  };

  const replaceme = () => {
    history.replace("/");
    logout();
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
