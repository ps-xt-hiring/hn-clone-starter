import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button(props) {
  const { type, value } = props;

  return (
    <button type={type}>
      {value}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
};

Button.defaultProps = {
  type: '',
  value: '',
};
