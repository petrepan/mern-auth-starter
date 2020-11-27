import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newpassword } from "../actions/user";
import Loader from "./Loader";

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");

  const token = match.params.token;
  const dispatch = useDispatch();

  const userForgot = useSelector((state) => state.userForgot);
  const { loading, error, userInfo } = userForgot;

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      history.push("/");
    }
  }, [userInfo, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(newpassword(password, token));
  };

  return (
    <div className="container">
      <h1>New password</h1>
      {error && <div className="msg">{error.message}</div>}
      {userInfo && <div className="msg">{userInfo.message}</div>}
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && error.password && <div>{error.password}</div>}
        </div>
        <button type="submit">Send Reset Link</button> {loading && <Loader />}
      </form>
    </div>
  );
};

export default NewPassword;
