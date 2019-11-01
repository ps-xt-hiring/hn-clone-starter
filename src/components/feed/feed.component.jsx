import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { ReactComponent as Arrowup } from "../../assets/arrow.svg";

const Feed = ({ title, points, author, created_at, url, objectID }) => {
  const [count, setCount] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let storedValue = sessionStorage.getItem(`count-${objectID}`);
    let setValifNotDefined = storedValue === null ? 0 : storedValue;
    setCount(parseInt(setValifNotDefined));
  }, [count]);

  useEffect(() => {
    let checkIfHidden = sessionStorage.getItem("objectID") === objectID;
    let parseHidden = checkIfHidden === null ? false : checkIfHidden;
    setHide(parseHidden);
  });

  const hideLine = () => {
    setHide(true);
    sessionStorage.setItem("objectID", objectID);
  };

  const setLocalStorage = () => {
    setCount(count + 1);
    sessionStorage.setItem(`count-${objectID}`, count + 1);
  };

  return (
    <>
      {hide ? (
        ""
      ) : (
        <Row className='p-1'>
          <Col xs={2} className='text-center'>
            {points && points}
          </Col>
          <Col xs={1}>
            {count}
            <span>
              <Arrowup className='arrow' onClick={setLocalStorage} />
            </span>
          </Col>
          <Col xs={9}>
            {title} (<a href={url}>{url}</a>) by {author} {created_at} hours ago{" "}
            <span className='hideline' onClick={hideLine}>
              [hide]
            </span>{" "}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Feed;
