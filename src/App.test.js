/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewsFeed from './components/NewsFeed';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App ><NewsFeed/></App>, div);
  ReactDOM.unmountComponentAtNode(div);
});
