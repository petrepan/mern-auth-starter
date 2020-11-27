import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgot } from "../actions/user";
import Loader from "./Loader";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userForgot = useSelector((state) => state.userForgot);
  const { loading, error, userInfo } = userForgot;

  console.log(userInfo);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgot(email));
  };

  return (
    <div className="container">
      <h1>Forgot password</h1>
      {error && <div className="msg">{error.message}</div>}
      {userInfo && <div className="msg">{userInfo.message}</div>}
      <form onSubmit={onSubmit} className="form">
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
          {error && error.user && <div>{error.user}</div>}
        </div>
        <button type="submit">Send Reset Link</button> {loading && <Loader />}
      </form>
    </div>
  );
};

export default ForgotPassword;
