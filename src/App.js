import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './css/newsFeed.scss';
import NewsFeed from './components/newsFeed';

const App = () =>
  <Switch>
    <Route path="/" exact component={NewsFeed} />
    <Route path="/news" exact component={NewsFeed} />
  </Switch>


export default App