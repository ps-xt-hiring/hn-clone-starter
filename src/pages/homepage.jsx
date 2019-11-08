import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/header/header.component';
import FeedList from '../components/feedlist/feedlist.component';

const HomePage = () => {
  return (
    <>
      <HeaderComponent />
      <FeedList />
    </>
  );
};

export default connect()(HomePage);
