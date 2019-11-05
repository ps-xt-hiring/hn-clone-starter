import React, { Component } from 'react';
import './upvote.css';
import PropTypes from 'prop-types';
import Text from '../text/text';
import { updateLocalStorage } from '../../services/common';

export default class Upvote extends Component {
  constructor(props) {
    super(props);
    const { item: { isUpvoted, points } } = this.props;
    this.state = {
      isUpvoted,
      points,
    };
    this.upvoteHandler = this.upvoteHandler.bind(this);
  }

  upvoteHandler() {
    const { item: { objectID } } = this.props;
    updateLocalStorage('upvotedItemsList', objectID);
    this.setState(state => ({
      isUpvoted: true,
      points: state.points + 1,
    }));
  }

  render() {
    const { points, isUpvoted } = this.state;
    return (
      <span className="New-upvotes">
        <Text value={points} type={`New-upvotes-count${isUpvoted ? ' upvoted' : ''}`} />

        <span className="New-upvotes-btn">
          <button
            type="button"
            className={`${isUpvoted ? 'disable' : ''}`}
            onClick={this.upvoteHandler}
            disabled={isUpvoted}
          />
        </span>
      </span>
    );
  }
}

Upvote.propTypes = {
  item: PropTypes.shape({
    isUpvoted: PropTypes.bool,
    points: PropTypes.number,
    objectID: PropTypes.string,
  }),
};

Text.defaultProps = {
  item: {},
};
