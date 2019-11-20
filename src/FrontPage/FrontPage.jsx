import React from 'react';
import Header from '../components/Header/Header';
import Feeds from '../components/Feeds/Feeds';

import './FrontPage.scss';

const FrontPage = () => ( 
  <div className="frontPage">
    <Header />
    <Feeds />
  </div>
);

export default FrontPage;
