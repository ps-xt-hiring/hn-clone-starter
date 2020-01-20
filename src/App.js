import React, { useState } from 'react';
import './App.css';
import StoryList from './components/StoryList';
import Header from './components/Header';

function App() {

  let [view, setView] = useState('top');

  function handleViewChange(view) {
    setView(view);
  }

  return (
    <div className="App">
      <header className="App-header">

        <div className="Container">
          <Header onViewChange={handleViewChange} />
          <StoryList view={view} />
        </div>

      </header>
    </div>
  );
}

export default App;
