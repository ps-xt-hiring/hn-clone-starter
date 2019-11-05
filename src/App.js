import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import Landing from './components/landingPage';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Router>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </Router>
    </div>
  </Provider>
);

export default App;
