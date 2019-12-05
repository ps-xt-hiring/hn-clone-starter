import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NewsContainer from './containers/NewsContainer';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route exact path="/" component={NewsContainer} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
