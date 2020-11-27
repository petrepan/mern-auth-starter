import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/user";

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
    }
  };
  return (
    <nav>
      <Link to="/">greeenapp</Link>
      <div>
        {!userInfo || !localStorage.getItem("userInfo") ? (
          <div>
            <Link to="/user/login">Login</Link>
            <Link to="/user/register">Register</Link>
          </div>
        ) : (
          <div className="navlinks">
            welcome
            <Link to={`/profile/${userInfo.user.username}`}>
              {userInfo.user.avatar}
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
