import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import FeedContainer from "./container/feed/Feed";
class AppRouting extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" component={FeedContainer} />
        <Redirect to="/" />
      </Switch>
    );

    return <React.Fragment>{routes}</React.Fragment>;
  }
}
export default AppRouting;

