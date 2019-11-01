import React from 'react';
import PropTypes from 'prop-types';
import './Username.css';

const Username = ({ author }) => <div className="username">{author}</div>;

Username.propTypes = {
  author: PropTypes.string.isRequired,
};

export default Username;
