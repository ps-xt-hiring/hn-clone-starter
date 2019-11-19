import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './upVote.scss';

export default function UpVote({ score = 0, id = 0 }) {
  const [upVote, setUpVote] = useState(0);
  const [points, setScore] = useState(score);

  // Get status of cuurent element
  useEffect(() => {
    const idStatus = localStorage.getItem(id);
    const idValue = idStatus !== null ? 1 : 0;
    setUpVote(idValue);
  }, [id]);

  const handleUpVote = (ObjectId) => {
    localStorage.setItem(ObjectId, !upVote);
    setUpVote(!upVote);
    const scored = !upVote ? points + 1 : points - 1;
    setScore(scored);
  };

  const handleKey = (e, kId) => {
    if (e.which === 38) {
      handleUpVote(kId);
    }
  };

  return (
    <p className={classnames('up-score', { disabled: upVote })}>
      { points }
      <span role="button" tabIndex={0} onClick={() => { handleUpVote(id); }} onKeyUp={(e) => { handleKey(e, id); }}>upVote</span>
    </p>
  );
}

UpVote.propTypes = {
  score: PropTypes.number,
  id: PropTypes.number,
};

UpVote.defaultProps = {
  score: 0,
  id: 0,
};
