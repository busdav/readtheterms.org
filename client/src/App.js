import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Router from "./Router";

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Router />
      </div>
    );
  }
}

export default App;
