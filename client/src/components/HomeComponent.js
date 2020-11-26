import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resend } from "../actions/user";
import Loader from "../components/Loader";

const HomeComponent = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();

  const userResend = useSelector((state) => state.userResend);
  const { loading, error, userInfo } = userResend;

  const resendEmail = (e) => {
    e.preventDefault();
    dispatch(resend(user.email));
  };

  return (
    <div className="container">
      {userInfo && <div className="dbmsg">{userInfo.message}</div>}
      {error && <div className="dbmsg">{error.message}</div>}
      {user && user.isVerified && (
        <p>
          Having trouble with activation? <br />
          P.S: Your activities will be limited cos youve not been verified
          {loading && <Loader />}
          <button onClick={resendEmail}>Reactivate </button>
        </p>
      )}
      <div className="repolink">
        <h5>Features</h5>
        <ul>
          <li>Registration with email, username and password</li>
          <li>Email verification</li>
          <li>Resend email verification</li>
          <li>Login with email or username and password</li>
          <li>Forgot password/reset password pages</li>
          <li>Update profile</li>
        </ul>
      </div>

      <h5>Check the github repo:</h5>
      <a href="https://github.com/petrepan/mern-auth-starter">
        https://github.com/petrepan/mern-auth-starter
      </a>
    </div>
  );
};

export default HomeComponent;
