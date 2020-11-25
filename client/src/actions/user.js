import axios from "axios";
import * as types from "../actions/types";

const URL = "https://mern-auth-starter.herokuapp.com";

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${URL}/api/user/register`,
      {
        username,
        email,
        password,
      },
      config
    );

    console.log(res.data);

    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: res.data });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: error.response.data
    });
    console.log(error.response.data);
  }
};

export const resend = (email) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_RESEND_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${URL}/api/user/register/resend`,
      {
        email,
      },
      config
    );

    console.log(res.data);

    dispatch({ type: types.USER_RESEND_SUCCESS, payload: res.data });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: types.USER_RESEND_FAIL,
      payload: error.response.data,
    });
    console.log(error.response.data);
  }
};

export const reset = (email) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${URL}/api/user/register/reset`,
      {
        email,
      },
      config
    );

    console.log(res.data);

      dispatch({ type: types.USER_REGISTER_FAIL, payload: res.data });
      dispatch({ type: types.USER_RESEND_FAIL, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: error.response.data,
    });
    console.log(error.response.data);
  }
};

export const activation = (token) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_ACTIVATION_REQUEST,
    });

    const res = await axios.get(
      `${URL}/api/user/activate/${token}`
    );

    console.log(res.data);

    dispatch({ type: types.USER_ACTIVATION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_ACTIVATION_FAIL,
      payload: error.response.data,
    });
    console.log(error.response.data);
  }
};