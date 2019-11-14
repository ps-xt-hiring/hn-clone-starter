import React from 'react';
import ReactDOM from 'react-dom';
import HackerNewsComponent from './HackerNewsComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HackerNewsComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
