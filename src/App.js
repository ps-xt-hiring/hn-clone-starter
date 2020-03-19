import React from 'react';
// import logo from './logo.gif';
import './App.css';
import Header from './components/header/header';
import NewsList from './components/news-list/news-list';

function App() {
  return (
    <div className="App">
      <Header />
      <NewsList />
    </div>
  );
}

export default App;
