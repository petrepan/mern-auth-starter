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

    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: error.response.data,
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

    dispatch({ type: types.USER_RESEND_SUCCESS, payload: res.data });
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

    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    dispatch({ type: types.USER_LOGOUT });

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

    const res = await axios.get(`${URL}/api/user/activate/${token}`);

    dispatch({ type: types.USER_ACTIVATION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_ACTIVATION_FAIL,
      payload: error.response.data,
    });
    console.log(error.response);
  }
};

export const login = (user, password) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${URL}/api/user/login`,
      {
        user,
        password,
      },
      config
    );

    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload: error.response.data,
    });
    console.log(error.response.data);
  }
};

export const forgot = (email) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${URL}/api/user/login/forgot`,
      {
        email,
      },
      config
    );

    dispatch({ type: types.USER_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_PASSWORD_FAIL,
      payload: error.response.data,
    });
    console.log(error.response.data);
  }
};

export const newpassword = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${URL}/api/user/login/reset/${token}`,
      {
        password,
      },
      config
    );

    dispatch({ type: types.USER_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_PASSWORD_FAIL,
      payload: error.response.data,
    });
    console.log(error.response.data);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch({ type: types.USER_LOGOUT });
};

export const getuserdetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${URL}/api/user/profile`, config);
    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload: error.response.data,
    });
    console.log(error.response);
  }
};

export const updateuser = (username, email, password) => async (dispatch) => {
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

    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: error.response.data,
    });
    console.log(error.response.data);
  }
};
