import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './css/newsFeed.scss';
import FeedLoader from './components/feedLoader';
import NotFound from './components/notFound';

const AsyncNewsFeed = Loadable({
  loader: () => import(/* webpackChunkName: "NewsFeed" */ './components/newsFeed'),
  loading: () => <FeedLoader />,
  modules: ['NewsFeed'],
});

const App = () => (
  <Switch>
    <Route path="/" exact component={AsyncNewsFeed} />
    <Route path="/news" exact component={AsyncNewsFeed} />
    <Route path="*" render={NotFound} />
  </Switch>
);

export default App;
