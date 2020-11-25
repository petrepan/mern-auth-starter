import * as types from "../actions/types"

export const login = (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return { loading: true };
    case types.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case types.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const register = (state = {}, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
      return { loading: true };
    case types.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const activate = (state = {}, action) => {
  switch (action.type) {
    case types.USER_ACTIVATION_REQUEST:
      return { loading: true };
    case types.USER_ACTIVATION_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_ACTIVATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};