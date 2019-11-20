import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Feeds from '../components/Feeds/Feeds';

import './FrontPage.scss';

class FrontPage extends Component {
  render() {
    return ( 
        <div className="frontPage">
            <Header></Header>
            <Feeds></Feeds>
        </div>
    );
  }
}

export default FrontPage;