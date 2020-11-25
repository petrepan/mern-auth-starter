import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { register, resend, activate } from "./reducers/user";

const reducer = combineReducers({
    userRegister: register,
    userResend: resend,
    userActivation: activate
});

const middleware = [thunk];

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
