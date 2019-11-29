import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewsContainer from './containers/NewsContainer';

function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/" component={NewsContainer} />
    </Router>
    </div>
  );
}

export default App;
