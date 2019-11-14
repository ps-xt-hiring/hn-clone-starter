import React, { Component } from 'react';
import FeedsData from './FeedsData';

class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="feeds">
        <FeedsData />
      </div>
    );
  }
}

export default Feeds;
