import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Header from './containers/header/Header';
import Newsfeed from './containers/newsfeed/Newsfeed';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Newsfeed} />
      </Switch>
    </div>
  );
}

export default App;
