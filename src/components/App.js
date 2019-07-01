import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../resources/styles/App.css';
import Header from './Header';
import FeedContainer from './FeedContainer';

function App() {
  return (
    <div className = 'container-fluid'>
      <Header />
      <FeedContainer />
    </div>
  );
}

export default App;
