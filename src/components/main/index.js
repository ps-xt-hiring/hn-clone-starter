import React from 'react';
import NewsList from '../news-list';
import './main.scss';

export default function Main(props) {
  return (
    <div className="container">
      {props.children}
      <NewsList />
    </div>
  );
}
