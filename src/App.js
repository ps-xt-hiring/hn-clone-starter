import React from 'react';
import Header from './components/header';
import Main from './components/main';
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <Main>
        <Header />
      </Main>
    </div>
  );
}
