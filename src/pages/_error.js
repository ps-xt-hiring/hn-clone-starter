import React from 'react';
import PropTypes from 'prop-types';
import '../assets/error.css';
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <div className="main-error">
      <div>
        <h1 className="status-code">{statusCode}</h1>
        <div className="status-code-msg">
          <h2>This page could not be found.</h2>
        </div>
      </div>
      <div>
        <Link href="/"><a href="/" className="nav-link">Go To Homepage</a></Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const { statusCode: resStatusCode } = res;
  const { statusCode: errStatusCode = 404 } = err;
  const statusCode = res ? resStatusCode : errStatusCode;
  return { statusCode };
};

Error.defaultProps = {
  statusCode: 200,
};

Error.propTypes = {
  statusCode: PropTypes.number,
};


export default Error;
