/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Navbar from '../navbar/Navbar';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Head><title>Hacker News</title></Head>
      <div className="container-fluid">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
