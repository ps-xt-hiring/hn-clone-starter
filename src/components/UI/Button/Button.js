import React from 'react';

import PropTypes from 'prop-types';
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

button.propTypes = {
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  children: PropTypes.string
};

export default button;
