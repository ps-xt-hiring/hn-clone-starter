
import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import FeedContainer from "./container/feed/Feed";
 const AppRouting = () => {
  return (
    <Switch>
    <Route path="/" component={FeedContainer} />
    <Redirect  from ="/" to="/" />

  </Switch> 
  )
}

export default AppRouting;

