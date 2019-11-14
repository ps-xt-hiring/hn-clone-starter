import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button(props) {
  const {
    onClick = () => {},
    dataParam = '',
    children,
    ...rest
  } = props;

  return (
    <button type="button" onClick={() => onClick(dataParam)} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  dataParam: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  onClick: () => {},
  dataParam: '',
  children: '',
};
