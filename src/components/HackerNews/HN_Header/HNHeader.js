import React, { useState } from 'react';
import PropTypes from 'prop-types';
import hnLogo from '../../../assets/y18.gif';
import './HNHeader.css';

export default function HNHeader(props) {
  const [focus, setFocus] = useState('top');
  return (
    <div className="hn-header">
      <img src={hnLogo} alt="hn-logo" className="hn-logo" />
      <span
        className={`hn-top ${focus === 'top' ? 'white' : 'black'}`}
        onClick={() => {
          setFocus('top');
          props.getHackerNewsData(0);
        }}
        onKeyDown={() => {
          setFocus('top');
          props.getHackerNewsData(0);
        }}
      >
        top
      </span>
      <span className="hn-pipe"> | </span>
      <span
        className={`hn-new ${focus === 'new' ? 'white' : 'black'}`}
        onClick={() => {
          setFocus('new');
          props.getHackerNewsData(0);
        }}
        onKeyDown={() => {
          setFocus('new');
          props.getHackerNewsData(0);
        }}
      >
        new
      </span>
    </div>
  );
}
HNHeader.propTypes = {
  getHackerNewsData: PropTypes.func.isRequired,
};
