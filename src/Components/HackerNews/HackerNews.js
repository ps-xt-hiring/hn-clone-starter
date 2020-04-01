/* eslint-disable */
import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getHitsData, upVote, hideFeed } from '../../store/Actions/actions';
import * as S from './HackerNews.style';

import Feed from '../Feed';

const HackerNews = () => {
  const feedData = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  const {
    data: hits,
    totalPages,
    apiRequestType,
    loading,
  } = feedData;
  let {
    page: numOfPage,
  } = feedData;
  let showMore = false;

  const hiddenFeeds = localStorage.getItem('hiddenFeeds')
    ? JSON.parse(localStorage.getItem('hiddenFeeds')) : [];

  const getInitialData = () => (
    dispatch(getHitsData('top', numOfPage))
  );

  useEffect(() => {
    getInitialData();
  }, []);

  const upVoteFeed = (feedId) => {
    dispatch(upVote(feedId));
  };

  const hideFeedFromView = (feedId) => {
    dispatch(hideFeed(feedId));
  };

  const showMoreFeed = () => {
    numOfPage += 1;
    dispatch(getHitsData(apiRequestType, numOfPage));
  };

  if (hits && hits.length) {
    hits.map((feed) => {
      feed.isHidden = hiddenFeeds.length && hiddenFeeds.indexOf(feed.objectID) > -1;
    });
  }

  showMore = numOfPage < totalPages;

  return (
    <Fragment>
      {!loading ? (
        <div>
          <S.StyledUl>
            {hits && hits.length && (
              hits.map((feed) => {
                return (
                  !feed.isHidden && (
                    <Feed
                      feed={feed}
                      key={feed.objectID}
                      upVoteFeed={upVoteFeed}
                      hideFeed={hideFeedFromView}
                    />
                  )
                )
              })
            )}
          </S.StyledUl>
          {showMore && (
            <S.ShowMore onClick={() => showMoreFeed()}>More</S.ShowMore>
          )}
        </div>
      ) : (
        <S.Loading>Loading...</S.Loading>
      )}
    </Fragment>
  );
};

HackerNews.propTypes = {
  feedData: PropTypes.shape({
    data: PropTypes.array,
    totalPages: PropTypes.number,
    apiRequestType: PropTypes.string,
    loading: PropTypes.bool,
  }),
};

HackerNews.defaultProps = {
  feedData: {},
};

export default HackerNews;
