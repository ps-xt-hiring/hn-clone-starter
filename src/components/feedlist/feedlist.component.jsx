import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feedlist.styles.scss";
import { Row, Col } from "reactstrap";
import Feed from "../feed/feed.component";

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

  return (
    <>
      <Row className='mt-4'>
        <Col xs={12} className='feed-container'>
          {isLoading ? (
            <div>...Loading </div>
          ) : (
            data.hits.length > 0 &&
            data.hits.map(feed => <Feed key={feed.objectID} {...feed} />)
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className='more'>
          <a href='#' onClick={() => setPageNum(pageNum + 1)} title='load more'>
            Load More
          </a>
        </Col>
      </Row>
    </>
  );
};

export default FeedList;
