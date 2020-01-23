import React from 'react';

import PropTypes from 'prop-types';
import Classes from './Button.module.scss';

const button = (props) => {
  const {
    clickHandler,
    disabled,
    show,
    children,
  } = props;

  return (
    <button
      className={[Classes.Button]}
      onClick={clickHandler}
      disabled={disabled}
      hidden={show}
      type="button"
    >
      {children}
    </button>
  );
};

button.defaultProps = {
  disabled: false,
  show: false,
};

button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  show: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default button;
