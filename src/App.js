import * as React from 'react';
import { render } from 'react-dom';
import HackerNews from './components/HackerNews';

import './App.css';

export default class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <HackerNews />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
