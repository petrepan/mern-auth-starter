import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/user";
import Loader from "./Loader";

const LoginComponent = ({ history }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo || localStorage.getItem("userInfo")) {
      history.push("/");
    }
  }, [userInfo, history]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user, password));
  };

  return (
    <div className="container">
      <h1>Log In</h1>
      {error && <div className="dbmsg">{error.message}</div>}
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label htmlFor="user">Username or Email</label>
          <input
            id="user"
            name="user"
            type="user"
            placeholder="Username or Email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          {error && error.user && (
            <div className="validatemsg">{error.user}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && error.password && (
            <div className="validatemsg">{error.password}</div>
          )}
        </div>
        <button type="submit">Login {loading && <Loader />}</button>
      </form>
      No account yet? <Link to="/user/register">register</Link>
    </div>
  );
};

export default LoginComponent;
