import React, { useState, useEffect, lazy, Suspense } from 'react';

import axios from 'axios';
import { Row, Col } from 'reactstrap';

import './feedlist.styles.scss';

const Feed = lazy(() => import('../feed/feed.component'));

const FeedList = () => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentData = data;
  useEffect(() => {
    let isSubscribed = true;
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        `https://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNum}`,
        {
          cancelToken: source.token
        }
      );
      if (isSubscribed) {
        const resultData = currentData.concat(result.data.hits);
        setData(resultData);
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {
      isSubscribed = false;
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              data.length > 0 &&
              data.map(feed => <Feed key={feed.objectID} {...feed} />)
            )}
          </Suspense>
          <span>{loadMore}</span>
        </Col>
      </Row>
    </>
  );
};

export default FeedList;
