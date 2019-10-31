import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './css/newsFeed.scss';
import NewsFeed from './components/newsFeed';
import NotFound from './components/notFound';
import ErrorBoundary from './errorBoundary';

const App = () => (
  <ErrorBoundary>
    <Switch>
      <Route path="/" exact component={NewsFeed} />
      <Route path="/news" exact component={NewsFeed} />
      <Route path="*" render={NotFound} />
    </Switch>
  </ErrorBoundary>
);

export default App;
