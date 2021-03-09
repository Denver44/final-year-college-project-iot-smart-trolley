import React from "react";
import "./login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const replacemeWithDashBoard = () => {
    history.replace("/dashboard");
  };

  return (
    <div className="login">
      <div className="login__center">
        <form
          id="login-form"
          action="registration/user_login.php"
          method="post"
          className="login__form"
        >
          <div className="login__text">
            <h1>Welcome</h1>
            <h2>Enter the details</h2>
          </div>

          <div className="form__fields">
            <input
              className="form__field__inputname"
              type="text"
              name="full_name"
              placeholder="Enter full name"
            />

            <input
              className="form__field__inputid"
              type="text"
              name="email"
              placeholder="Enter email"
            />

            <input
              className="form__field__inputnum"
              type="number"
              name="phone_number"
              placeholder="Enter phone number"
            />
            <button onClick={replacemeWithDashBoard} className="login__formbtn">
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
