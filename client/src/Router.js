import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withAuth from "./components/withAuth";
import Home from "./components/Home";
import Secret from "./components/Secret";
import Login from "./components/Login";

const Router = props => (
  <Switch>
    <Route path="/app" exact component={Home} />
    <Route path="/app/secret" component={withAuth(Secret)} />
    <Route path="/app/login" component={Login} />
  </Switch>
);

export default Router;
