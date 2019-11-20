import React, { Component } from 'react';
import arrow from './grayarrow.gif';

class Upvote extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  upvote() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  render() {
    const { count } = this.state;
    return (
      <span className="upvote">
        <span className="upvote-count">{count}</span>
        <button type="button" onClick={() => this.upvote()}>
          <img src={arrow} alt="upvote" />
        </button>
      </span>
    );
  }
}

export default Upvote;
