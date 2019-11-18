import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './upVote.scss';

export default function UpVote({score, id}) {
  const [upVote, setUpVote] = useState(0);
  const [points, setScore] = useState(score ? score : 0);
  
  // Get status of cuurent element
  useEffect(() => {
    const idStatus = localStorage.getItem(id);
    idStatus !== null ? setUpVote(1) : setUpVote(0);
  }, [id])
  
  function handleUpVote (id) {
    localStorage.setItem(id, !upVote);
    setUpVote(!upVote);
    !upVote ? setScore(points + 1) : setScore(points - 1);
  }

  return (
    <p className={classnames('up-score', {'disabled': upVote})}>
      {points}<span onClick={() => handleUpVote(id)} >upVote</span>
    </p>
  )
}
