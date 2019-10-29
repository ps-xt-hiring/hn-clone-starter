import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  const { message } = props;
  return (<div className="message-text">{message}</div>);
};

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: 'Loading',
};

export default Loading;
