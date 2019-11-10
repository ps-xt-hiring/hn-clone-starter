import React from 'react';
import PropTypes from 'prop-types';
import { getNewsList } from '../utils/helpers';
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

ServerApp.getInitialProps = ({ query: { page = 0 } }) => getNewsList(page);

ServerApp.defaultProps = {
  data: [],
  page: 0,
};

ServerApp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
};


export default ServerApp;
