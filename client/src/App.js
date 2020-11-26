import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/HomeComponent";
import Register from "./components/RegisterComponent";
import Login from "./components/LoginComponent";
import Activate from "./components/ActivateComponent";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/profile/:username" component={Profile} exact />
        <Route path="/user/register" component={Register} exact />
        <Route path="/user/login" component={Login} />
        <Route path="/forgot" component={ForgotPassword} exact />
        <Route path="/user/activate/:token" component={Activate} />
        <Route path="/user/newpassword/:token" component={NewPassword} />
        <Route component={NotFound} exact />
      </Switch>
    </Router>
  );
};

export default App;
