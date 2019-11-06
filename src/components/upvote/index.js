import React, { Component } from 'react';
import './upvote.scss';
import PropTypes from 'prop-types';
import Text from '../text';
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

  // Function name: upvoteHandler
  // Arguments: none
  // It triggers on upvote button click which counts a vote and update the local storage
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
      <span className="new__upvotes">
        <Text value={points} type={`new__upvotes-count${isUpvoted ? ' upvoted' : ''}`} />

        <span className="new__upvotes-btn">
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

Upvote.defaultProps = {
  item: {
    isUpvoted: false,
    points: 0,
    objectID: '',
  },
};
