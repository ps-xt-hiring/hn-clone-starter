import React from "react";
import noop from 'loadsh/noop';
import PropTypes from "prop-types";


const propsTypes = {
  event: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};
const defaultProps = {
  event: noop,
  className: 'default',
  children: undefined
};
const Button = (props) => {
  const { className, event, children } = props;
  return <button type="button"
    className={className}
    onClick={event}
  >{children}</button>
}

Button.propTypes = propsTypes;
Button.defaultProps = defaultProps;
export default Button; 
