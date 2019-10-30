/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Loader from '../components/loader/Loader';
import App from '../App';

function ServerApp(props) {
  const { page, data } = props;
  return (
    <div>
      <Loader />
      <App page={page} total={data.length} lists={data} />
    </div>
  );
}

// eslint-disable-next-line func-names
ServerApp.getInitialProps = async function ({ query: { page = 0 } }) {
  const res = await fetch(`https://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`);
  const data = await res.json();

  return {
    data: data.hits,
    page: parseInt(page, 10),
  };
};

ServerApp.defaultProps = {
  data: [],
  page: 0,
};

ServerApp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  page: PropTypes.number,
};


export default ServerApp;
