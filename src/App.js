import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import { store } from './redux/store';
import './App.scss';
import HomePage from './pages/homepage';

function App() {
  return (
    <Container className="main-container">
      <Provider store={store}>
        <HomePage />
      </Provider>
    </Container>
  );
}

export default App;
