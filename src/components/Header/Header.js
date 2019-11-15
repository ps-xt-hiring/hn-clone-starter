import React from 'react';
import './Header.css';

const header = props => {
  const { newText, topText } = { ...props };
  return (
    <header className="news-header">
      <span className="logo">Y</span>
      <a href="/" className="topLink">
        {topText}
      </a>
      <a href="/" className="newLink">
        {newText}
      </a>
    </header>
  );
};

export default header;
