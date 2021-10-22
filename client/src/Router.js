import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/Home"
import Room from "./pages/Room";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/room">
            <Room />
          </Route>
          <Route  path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  
}
