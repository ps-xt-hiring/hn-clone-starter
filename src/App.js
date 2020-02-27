
import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import GreetingPage from './components/GreetingPage';
import HackerPage from './components/HackerPage';
import Navbar from './components/common/Navbar';

import rootReducer from './store/reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Navbar/>
          <Router history={ browserHistory } >
            <Route path="/" component={HackerPage} />
            <Route path="/welcome" component={GreetingPage} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;


// export default App;




