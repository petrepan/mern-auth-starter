import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/RegisterComponent"

const App = () => {
  return (
    <Router>
      <Route path="/register" component={Register}/>
    </Router>
  )
};

export default App;
