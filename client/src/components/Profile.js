import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserdetails, updateuser } from "../actions/user";
import Loader from "./Loader";

const Profile = ({ match, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    console.log(userLogin)
  
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getuserdetails());
  }, [dispatch, userInfo ]);

  const onSubmit = () => {
    dispatch(updateuser());
  };

  return (
    <div className="container">
      {" "}
      <h1>Update Profile</h1>
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
    </div>
  );
};

export default Profile;
