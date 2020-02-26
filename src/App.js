import React from 'react';
import { Provider } from 'react-redux';
import FrontPage from './components/HackerNews/FrontPage';
import './App.css';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <FrontPage />
        </div>
      </div>
    </Provider>
  );
}

export default App;
