import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button(props) {
  const { value } = props;

  return (
    <button type="button">
      {value}
    </button>
  );
}

Button.propTypes = {
  value: PropTypes.string,
};

Button.defaultProps = {
  value: '',
};
