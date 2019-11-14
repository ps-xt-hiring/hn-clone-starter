import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button(props) {
  const { onClick = () => {}, dataParam = '', ...rest } = props;

  return (
    <button type="button" onClick={() => onClick(dataParam)} {...rest}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  dataParam: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  dataParam: '',
};
