import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import ConnectedLanding from './components/module/feedContainer';
import './App.scss';

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <div className="App">
      <Router>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={ConnectedLanding} />
          </Switch>
        </div>
      </Router>
    </div>
  </Provider>
)
export default App;
