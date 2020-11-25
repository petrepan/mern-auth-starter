import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/RegisterComponent"
import Activate from "./components/ActivateComponent";

const App = () => {
  return (
    <Router>
      <Route path="/register" component={Register} />
      <Route path="/user/activate/:token" component={Activate} />
    </Router>
  );
};

export default App;
