import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import HackerNewsPost from "./HackerNewsPost";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HackerNewsPost} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
