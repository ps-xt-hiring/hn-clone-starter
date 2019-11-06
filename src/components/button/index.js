import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button(props) {
  const { buttontype, value } = props;

  return (
    <button type={buttontype}>
      {value}
    </button>
  );
}

Button.propTypes = {
  buttontype: PropTypes.string,
  value: PropTypes.string,
};

Button.defaultProps = {
  buttontype: '',
  value: '',
};
