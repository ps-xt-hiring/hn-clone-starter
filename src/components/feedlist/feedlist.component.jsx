import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import fetchFeed from '../../redux/feed/fetch.feed';
import Feed from '../feed/feed.component';
import Spinner from '../spinner/spinner.component';
import { TEXT } from '../../helpers/constant';

import './feedlist.styles.scss';

const FeedList = () => {
  const [pageNum, setPageNum] = useState(0);
  const dispatch = useDispatch();

  const loadedData = useSelector(feed => feed);

  useEffect(() => {
    dispatch(fetchFeed(pageNum));
  }, [pageNum]);

  const loadMore = (
    <button
      type="button"
      className="button"
      onClick={() => setPageNum(pageNum + 1)}
    >
      {' '}
      {TEXT.LOAD_MORE}
    </button>
  );

  return (
    <>
      <Row className="mt-4">
        <Col xs={12} className="feed-container">
          {(loadedData && loadedData.feed.fetching) ||
          !loadedData.feed.fetched ? (
            <div>
              <Spinner />
            </div>
          ) : (
            loadedData &&
            loadedData.feed.feedItems.hits.length > 0 &&
            loadedData.feed.feedItems.hits.map(feed => (
              <Feed key={feed.objectID} {...feed} />
            ))
          )}
        </Col>
        <Col xs={12} className="load-more">
          <span className="pl-5">{loadMore}</span>
        </Col>
      </Row>
    </>
  );
};

export default FeedList;
