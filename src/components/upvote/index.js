import React from 'react';
import './upvote.scss';
import PropTypes from 'prop-types';
import Text from '../text';
import Button from '../button';

export default function Upvote(props) {
  const { item: { isUpvoted, points, objectID }, upvoteHandler } = props;

  return (
    <div className="new__upvotes">
      <Text value={points} type={`new__upvotes-count${isUpvoted ? ' upvoted' : ''}`} />

      <span className="new__upvotes-btn">
        <Button
          type="button"
          className={`${isUpvoted ? 'disable' : ''}`}
          onClick={upvoteHandler}
          dataParam={objectID}
          disabled={isUpvoted}
        />
      </span>
    </div>
  );
}

Upvote.propTypes = {
  item: PropTypes.shape({
    isUpvoted: PropTypes.bool,
    points: PropTypes.number,
    objectID: PropTypes.string,
  }),
  upvoteHandler: PropTypes.func,
};

Upvote.defaultProps = {
  item: {
    isUpvoted: false,
    points: 0,
    objectID: '',
  },
  upvoteHandler: () => {},
};
