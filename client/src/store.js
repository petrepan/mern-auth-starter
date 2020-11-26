import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  register,
  resend,
  activate,
  login,
  forgot,
  userdetails,
  userupdate,
} from "./reducers/user";

const reducer = combineReducers({
  userRegister: register,
  userResend: resend,
  userActivation: activate,
  userLogin: login,
  userForgot: forgot,
  userDetails: userdetails,
  userUpdate: userupdate,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
