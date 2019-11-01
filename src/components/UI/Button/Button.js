import React from 'react';
import Classes from './Button.module.scss';

const button = props => (
  <button
    className={[Classes.Button].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
    hidden={props.show}
  >
    {props.children}
  </button>
);

export default button;
