import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Router from "./Router";

let test;

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/app">Home</Link>
          </li>
          <li>
            <Link to="/app/secret">Secret</Link>
          </li>
          <li>
            <Link to="/app/login">Login</Link>
          </li>
        </ul>

        <Router />
      </div>
    );
  }
}

export default App;
