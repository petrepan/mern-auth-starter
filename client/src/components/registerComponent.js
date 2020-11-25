import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/user";
import Loader from "./Loader"

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState({ username: "", email: "", password: "" });
  const [registerStep, setRegisterStep] = useState("register");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(register(username, email, password));
  };

  const resendEmail = () => {};

  const resetAccount = () => {};

  function renderSwitch() {
    switch (registerStep) {
      case "register":
        return (
          <div className="container">
            <form onSubmit={onSubmit} className="form">
              <div className="field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Signup</button>
              {message && <div>{message}</div>}
            </form>
          </div>
        );
      case "resend":
        return (
          <div className="container">
            <p>A verification email has been sent.</p>
            <p>Check you mailbox : {email}.</p>
            <p>
              You have 12 hours to activate your account. It can take up to 15
              min to receive our email.
            </p>
            <button onClick={resendEmail}>
              Did not receive the email? Click here to send again.
            </button>
            {message && <div>{message}</div>}
          </div>
        );

      case "reset":
        return (
          <div className="container">
            <p>Still not received an email? </p>
            <p>Try to register again. You may have given the wrong email. </p>
            <p>
              If you want to be able to use the same username, reset the
              registration :
            </p>
            <button onClick={resetAccount}>
              Click here to reset the registration
            </button>
            {message && <div>{message}</div>}
          </div>
        );
      default:
        break;
    }
  }

  return (
    <div>
      {renderSwitch()}
    </div>
  );
};

export default RegisterComponent;
