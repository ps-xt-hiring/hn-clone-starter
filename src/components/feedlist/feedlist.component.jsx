import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import Feed from '../feed/feed.component';
import './feedlist.styles.scss';

const FeedList = () => {
  const [data, setData] = useState({ hits: [] });
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNum}`
      );

      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [pageNum]);

  const loadMore = (
    <button
      onClick={() => setPageNum(pageNum + 1)}
      title="load more"
      type="button"
      aria-hidden="true"
      tabindex="0"
    >
      Load More
    </button>
  );

  return (
    <>
      <Row className="mt-4">
        <Col xs={12} className="feed-container">
          {isLoading ? (
            <div>...Loading </div>
          ) : (
            data.hits.length > 0 &&
            data.hits.map(feed => <Feed key={feed.objectID} {...feed} />)
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="more">
          {loadMore}
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
