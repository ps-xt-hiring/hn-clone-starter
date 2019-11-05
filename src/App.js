import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { initialState } from './store/initialState';
import configureStore from './store/configureStore';
import Landing from './components/landingPage';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

const store = configureStore(initialState);

const App = () => {
  return (
    <Provider store={ store }>
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
}

export default App;
