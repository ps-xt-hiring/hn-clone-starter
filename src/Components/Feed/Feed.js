/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as S from './Feed.style';

const Feed = ({
  feed,
  upVoteFeed,
  hideFeed,
}) => {
  const publishTime = moment(feed.created_at).fromNow();
  const displayUrl = feed.url ? feed.url.split('/')[2] : '';

  return (
    <S.StyledLi>
      <S.Comments>{feed.num_comments || 0}</S.Comments>
      <S.Points>
        {feed.points || 0}
        <S.UpArrow onClick={() => upVoteFeed(feed.objectID)} />
      </S.Points>
      <S.FeedDetails>
        <S.TitleDetails>
          <S.Title>{`${feed.title} `}</S.Title>
          <S.StyledLink
            href={feed.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            (
            {displayUrl}
            )
          </S.StyledLink>
        </S.TitleDetails>
        <S.AuthorTimeDetails>
          <span>by</span>
          <S.Author>{` ${feed.author} `}</S.Author>
          <span>{publishTime}</span>
        </S.AuthorTimeDetails>
        <S.Hide onClick={() => hideFeed(feed.objectID)}>
          [
          <span>hide</span>
          ]
        </S.Hide>
      </S.FeedDetails>
    </S.StyledLi>
  );
};

Feed.propTypes = {
  feed: PropTypes.shape({
    created_at: PropTypes.string,
    url: PropTypes.string,
    num_comments: PropTypes.number,
    points: PropTypes.number,
    objectID: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
  }),
  upVoteFeed: PropTypes.func,
  hideFeed: PropTypes.func,
};

Feed.defaultProps = {
  feed: {},
  upVoteFeed: () => {},
  hideFeed: () => {},
};

export default Feed;
