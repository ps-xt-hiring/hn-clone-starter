import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { ReactComponent as Arrowup } from '../../assets/arrow.svg';
import { TEXT } from '../../helpers/constant';
import { timeSince, getDomain } from '../../helpers/utils';
import './feed.styles.scss';

const Feed = ({ title, points, author, url, created_at, objectID }) => {
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

  const createdAt = created_at;

  return (
    <>
      {hide ? (
        ''
      ) : (
        <Row className="p-1 feed-component">
          <Col xs={1} className="text-center">
            <span>{points && points}</span>
          </Col>
          <Col xs={1}>
            <span>{count}</span>
            <span>
              <button type="button" onClick={setLocalStorage}>
                <Arrowup className="arrow" />
              </button>
            </span>
          </Col>
          <Col xs={10}>
            <span>{title && title}</span>
            <span>
              {url && (
                <a className="origin-url" href={url}>
                  {getDomain(url)}
                </a>
              )}
            </span>
            <span>{TEXT.BY}</span>
            <span>{author && author}</span>
            <span className="font-weight-bold pl-2">
              {createdAt && timeSince(createdAt)}
            </span>
            <button type="button" className="hideline" onClick={hideLine}>
              {TEXT.HIDE}
            </button>
          </Col>
        </Row>
      )}
    </>
  );
};

Feed.propTypes = {
  title: PropTypes.string,
  points: PropTypes.number,
  author: PropTypes.string,
  url: PropTypes.string,
  objectID: PropTypes.string,
  created_at: PropTypes.string
};

Feed.defaultProps = {
  title: 'title',
  points: 0,
  author: 'default',
  url: 'www.example.com',
  objectID: '0',
  created_at: '0'
};

export default Feed;
