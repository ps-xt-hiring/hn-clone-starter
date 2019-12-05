import React from 'react';
import PropTypes from 'prop-types';
import { ListingStyled } from './ListingStyles';
import { NewsLisitngComments, NewsLisitngPoints, VoteUp, ListBody } from './ListUtils';

const Listing = (props) => {
  const { newsListingData, hideNews, increaseVoteCount } = props;
  return (
    <>
      {newsListingData.map((news) => {
        const newsId = news.objectID;
        return (
          <ListingStyled key={newsId} className="newsList">
            <NewsLisitngComments commentsCount={news.num_comments} />
            <NewsLisitngPoints points={news.points} />
            <VoteUp increaseVoteCount={increaseVoteCount} newsId={newsId} />
            <ListBody news={news} hideNews={hideNews} />
          </ListingStyled>
        );
      })}
    </>
  );
};
export default Listing;

Listing.propTypes = {
  newsListingData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  increaseVoteCount: PropTypes.func.isRequired,
}
Listing.defaultProps = {
  newsListingData: []
}
