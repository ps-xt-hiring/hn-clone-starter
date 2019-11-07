import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {
  const {
    onClick, title, variant, className,
  } = props;

  const classes = `${variant} ${className} btn-component`;
  return (<input type="button" onClick={onClick} className={classes} value={title} />);
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Button;
