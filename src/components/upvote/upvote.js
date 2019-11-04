import React, { Component } from 'react';
import './upvote.css';
import Text from '../text/text';
import { updateLocalStorage } from '../../services/common';

export default class Upvote extends Component {
  constructor (props) {
    super(props);
    let { isUpvoted, points } = this.props.item;
    this.state = {
      isUpvoted: isUpvoted,
      points: points
    }
    this.upvoteHandler = this.upvoteHandler.bind(this);
  }

  upvoteHandler() {
    updateLocalStorage('upvotedItemsList', this.props.item.objectID);
    this.setState({ 
      isUpvoted: true,
      points: this.state.points + 1
    });
  }

  render () {
    return (
      <span className="New-upvotes">
        <Text value={this.state.points} type={`New-upvotes-count${this.state.isUpvoted ? ' upvoted' : ''}`} />

        <span className="New-upvotes-btn">
          <button className={`${this.state.isUpvoted ? 'disable' : ''}`} onClick={this.upvoteHandler} disabled={this.state.isUpvoted}></button>
        </span>
      </span>
    );
  }
}
