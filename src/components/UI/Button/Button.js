import React from 'react';

import PropTypes from 'prop-types';
import Classes from './Button.module.scss';

const button = props => {
  const { clicked, disabled, show, children } = props;
  return (
    <button
      className={[Classes.Button].join(' ')}
      onClick={clicked}
      disabled={disabled}
      hidden={show}
    >
      {children}
    </button>
  );
};

button.propTypes = {
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  children: PropTypes.string
};

export default button;
