import React from 'react';
import PropTypes from 'prop-types';
import './Hide.css';

const Hide = (props) => <div className="hide-button" onClick={() => props.hideAction(props.objectID)}>hide</div>

Hide.propTypes = {
  hideAction: PropTypes.func,
  objectID: PropTypes.string
};

export default Hide;
