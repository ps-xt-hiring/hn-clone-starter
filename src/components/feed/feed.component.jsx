import React, { useState, useEffect } from 'react';
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

  const dateCreated = props.created_at;

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
            {title} (<a href={url}>{getDomain(url)}</a>) by
            {author}{' '}
            <span className="font-weight-bold">
              {Moment(dateCreated).fromNow()} hours ago{' '}
            </span>
            <span
              className="hideline"
              onKeyUp={() => {}}
              role="button"
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

export default Feed;
