import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, resend, reset } from "../actions/user";
import Loader from "./Loader";

const RegisterComponent = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerStep, setRegisterStep] = useState("register");
 
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const userResend = useSelector((state) => state.userResend);
  const { loading, error, userInfo, regsuccess } = userRegister;
  const { resetsuccess } = userResend;

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (regsuccess) {
      setRegisterStep("resend");
    }

    if (resetsuccess) {
      setRegisterStep("reset");
    }

    if (!resetsuccess && !regsuccess) {
      setRegisterStep("register");
    }
  }, [regsuccess, resetsuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
  };

  const resendEmail = (e) => {
    e.preventDefault();
    dispatch(resend(email));
  };

  const resetAccount = (e) => {
    e.preventDefault();
    dispatch(reset(email));
    setEmail("");
    setUsername("");
    setPassword("");
    history.push("/user/register");
  };

  function renderSwitch() {
    switch (registerStep) {
      case "register":
        return (
          <div className="container">
            <h1>Register for a new account</h1>
            {error && <div className="dbmsg">{error.message}</div>}
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
                  required
                />
                {error && error.username && (
                  <div className="validatemsg">{error.username}</div>
                )}
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
                  required
                />
                {error && error.email && (
                  <div className="validatemsg">{error.email}</div>
                )}
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
                  required
                />
                {error && error.password && (
                  <div className="validatemsg">{error.password}</div>
                )}
              </div>
              <button type="submit">Signup {loading && <Loader />}</button>
            </form>
            have an account? <Link to="/user/login">login</Link>
          </div>
        );
      case "resend":
        return (
          <div className="container">
            {userResend.error && (
              <div className="dbmsg">{userResend.error.message}</div>
            )}
            <p>A verification email has been sent.</p>
            <p>Check you mailbox : {email}.</p>
            <p>Activate your account to get full control of your account</p>
            <button onClick={resendEmail}>
              Did not receive the email? Click here to send again.
            </button>{" "}
            {loading && <Loader />}
            have an account? <Link to="/user/login">login</Link>
          </div>
        );

      case "reset":
        return (
          <div className="container">
            {error && <div className="dbmsg">{error.message}</div>}
            <p>Still not received an email? </p>
            <p>Try to register again. You may have given the wrong email. </p>
            <p>
              If you want to be able to use the same username, reset the
              registration :
            </p>
            <button onClick={resetAccount}>
              Click here to reset the registration
              {loading && <Loader />} 
            </button>
            have an account? <Link to="/login">login</Link>
          </div>
        );
      default:
        break;
    }
  }

  return <div>{renderSwitch()}
  </div>;
};

export default RegisterComponent;
