import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const {
    onClick, title, variant: buttonVariation, className,
  } = props;

  return (<input type="button" onClick={onClick} className={`${buttonVariation} ${className} btn-component`} value={title} />);
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Button;
