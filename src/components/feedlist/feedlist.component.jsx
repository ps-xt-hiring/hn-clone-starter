import React, { useState, useEffect, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

import './feedlist.styles.scss';

const Feed = lazy(() => import('../feed/feed.component'));

const FeedList = () => {
  const [data, setData] = useState({ hits: [] });
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        `https://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNum}`
      );
      if (isSubscribed) {
        setData(result.data);
      }
      setIsLoading(false);
      return () => (isSubscribed = false);
    };
    fetchData();
  }, [pageNum]);

  const loadMore = (
    <span
      className="button"
      onClick={() => setPageNum(pageNum + 1)}
      onKeyUp={() => {}}
      role="button"
      tabIndex={0}
    >
      Load More
    </span>
  );

  return (
    <>
      <Row className="mt-4">
        <Col xs={12} className="feed-container">
          <Suspense fallback={<span>...loading</span>}>
            {isLoading ? (
              <div>...Loading </div>
            ) : (
              data.hits.length > 0 &&
              data.hits.map(feed => <Feed key={feed.objectID} {...feed} />)
            )}
          </Suspense>
          <span>{loadMore}</span>
        </Col>
      </Row>
    </>
  );
};

FeedList.propTypes = {
  title: PropTypes.string,
  point: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  objectID: PropTypes.string,
  created_at: PropTypes.string
};

export default FeedList;
