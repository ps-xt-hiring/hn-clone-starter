import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ label }) => <div>{label}</div>;

Title.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Title;
