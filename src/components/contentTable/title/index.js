import React from 'react';
import PropTypes from 'prop-types';
import './Title.css';

const Title = ({ label }) => <div className="title">{label}</div>

Title.propTypes = {
  label: PropTypes.string
};

export default Title;
