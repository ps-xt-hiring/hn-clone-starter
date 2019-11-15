import React, { Fragment } from 'react';
import Header from '../Header/Header';
import NewsSection from '../NewsSection/NewsSection';

const Layout = () => (
  <Fragment>
    <Header newText="new" topText="top" />
    <NewsSection />
  </Fragment>
);

export default Layout;
