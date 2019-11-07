import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Moment from 'moment';
import { ReactComponent as Arrowup } from '../../assets/arrow.svg';
import './feed.styles.scss';

const Feed = ({ title, points, author, url, objectID, ...props }) => {
  const [count, setCount] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(`count-${objectID}`);
    const setValifNotDefined = storedValue === null ? 0 : storedValue;
    setCount(parseInt(setValifNotDefined, 10));
  }, [count, objectID]);

  useEffect(() => {
    const checkIfHidden = sessionStorage.getItem('objectID') === objectID;
    const parseHidden = checkIfHidden === null ? false : checkIfHidden;
    setHide(parseHidden);
  }, [objectID]);

  const hideLine = () => {
    setHide(true);
    sessionStorage.setItem('objectID', objectID);
  };

  const setLocalStorage = () => {
    setCount(count + 1);
    sessionStorage.setItem(`count-${objectID}`, count + 1);
  };

  const getDomain = getURL => {
    const domain = new URL(getURL);
    return domain.origin;
  };

  // eslint-disable-next-line react/destructuring-assignment
  const createdAt = props.created_at;

  return (
    <>
      {hide ? (
        ''
      ) : (
        <Row className="p-1">
          <Col xs={2} className="text-center">
            {points && points}
          </Col>
          <Col xs={1}>
            {count}
            <span>
              <Arrowup className="arrow" onClick={setLocalStorage} />
            </span>
          </Col>
          <Col xs={9}>
            {title && title}
            {url && <a href={url}>{getDomain(url)}</a>}
            by
            {author && author}
            <span className="font-weight-bold">
              {createdAt && Moment(createdAt).fromNow()}
            </span>
            <span
              className="hideline"
              onKeyUp={() => {}}
              role="button"
              tabIndex={0}
              onClick={hideLine}
            >
              [hide]
            </span>
          </Col>
        </Row>
      )}
    </>
  );
};

Feed.propTypes = {
  title: PropTypes.string,
  points: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  objectID: PropTypes.string,
  created_at: PropTypes.string
};

Feed.defaultProps = {
  title: 'title',
  points: '0',
  author: 'default',
  url: 'www.example.com',
  objectID: '0',
  created_at: '0'
};

export default Feed;
