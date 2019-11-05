import React from 'react';
import PropTypes from 'prop-types';

export default function Text(props) {
  const { type, value } = props;
  return (
    <span className={`text-cl ${type}`}>
      {value}
    </span>
  );
}

Text.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
