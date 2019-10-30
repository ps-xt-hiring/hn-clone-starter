import React from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
// import { getNewsFeed } from './actions/newsAction';
// import { Container, Grid, Link, Table, TableBody, TableCell, TableRow } from '@material-ui/core/';
// import * as moment from 'moment';
import './css/newsFeed.scss';
import NewsFeed from './components/newsFeed';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={NewsFeed} />
        <Route path="/news" exact component={NewsFeed} />
      </Switch>
    );
  }
}