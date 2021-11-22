import React, { useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sigIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__center">
        <div className="login__heading">
          <h1>Welcome</h1>
          <h3>Enter the details</h3>
        </div>

        <form className="form">
          <input
            type="text"
            value={email}
            placeholder="Enter your mail-Id"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={sigIn} className="btn btn__SignIn">
            Sign In
          </button>
          <button onClick={register} className="btn btn__SignUp">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
