import React from 'react';
import PropTypes from 'prop-types';
import '../assets/error.css';

function Error({ statusCode }) {
  return (
    <div className="main-error">
      <div>
        <h1 className="status-code">{statusCode}</h1>
        <div className="status-code-msg">
          <h2>This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.defaultProps = {
  statusCode: 200,
};

Error.propTypes = {
  statusCode: PropTypes.number,
};


export default Error;
