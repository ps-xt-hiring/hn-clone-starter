import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {
  const {
    onClick, title, variant, className,
  } = props;
  return (<input type="button" id={variant} onClick={onClick} className={className} value={title} />);
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};


export default Button;
