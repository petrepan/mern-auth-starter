import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activation } from "../actions/user";
import Loader from "./Loader";

const ActivateComponent = ({ match }) => {
  const token = match.params.token;

  const dispatch = useDispatch();

  const userActivation = useSelector((state) => state.userActivation);
  const { loading, userInfo, error } = userActivation;

  const handleClick = () => {
    dispatch(activation(token));
  };
  return (
    <div>
      {error && <div>{error.message}</div>}
      <button onClick={handleClick}>Activate Account</button>
      {loading && <Loader />}
    </div>
  );
};

export default ActivateComponent;
