import React from 'react';
import PropTypes from 'prop-types';
import './Hide.css';

const Hide = props => <div role="button" tabIndex={0} className="hide-button" onClick={() => props.hideAction(props.objectID)} onKeyPress={() => props.hideAction(props.objectID)}>hide</div>;

Hide.propTypes = {
  hideAction: PropTypes.func.isRequired,
  objectID: PropTypes.string.isRequired,
};

export default Hide;
