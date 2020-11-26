import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activation } from "../actions/user";
import Loader from "./Loader";

const ActivateComponent = ({ match, history }) => {
  const token = match.params.token;

  const dispatch = useDispatch();

  const userActivation = useSelector((state) => state.userActivation);
  const { loading, userInfo, error } = userActivation;

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      history.push("/");
    }
  }, [userInfo, history]);

  const handleClick = () => {
    dispatch(activation(token));
  };
  return (
    <div className="container">
      {error && <div>{error.message}</div>}
      {userInfo && <div>{userInfo.message}</div>}
      <button onClick={handleClick}>Activate Account</button>
      {loading && <Loader />}
    </div>
  );
};

export default ActivateComponent;
