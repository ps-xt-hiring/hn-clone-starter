import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './css/newsFeed.scss';
// import NewsFeed from './components/newsFeed';
import NotFound from './components/notFound';

const AsyncNewsFeed = Loadable({
  loader: () => import(/* webpackChunkName: "NewsFeed" */ './components/newsFeed'),
  loading: () => <div>loading...</div>,
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
