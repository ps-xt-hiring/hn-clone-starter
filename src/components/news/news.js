import React, { Fragment, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;
`;
const Div = styled.div`
  display: inline;

  &.news-control-wrapper {
    float: left
  }
`;

JavascriptTimeAgo.locale(en);

function News(props) {
  const [voteCounter, setVoteCounter] = useState(0);
  const [hideArray, sethideArray] = useState([]);
  let voteCounterClass = 'low';

  const gethostname = (getUrl) => {
    const url = document.createElement('a');
    url.setAttribute('href', getUrl);
    return url.hostname;
  };

  const upVote = () => {
    setVoteCounter(prevVoteCount => prevVoteCount + 1);
    localStorage.setItem(props.post.title, JSON.stringify(voteCounter));
    if (voteCounter > 50) {
      voteCounterClass = 'high';
    } else if (voteCounter > 100) {
      voteCounterClass = 'medium';
    }
  };

  const hideRecord = () => {
    sethideArray(prevArray => [...prevArray, props.post]);
    localStorage.setItem(props.post.title, JSON.stringify(hideArray));
  };

  const { post } = props;
  const {
    num_comments, url, author, created_at, title, index,
  } = post;
  return (
    <Fragment>
      <Div className="news-control-wrapper">
        <span className="num-comments">{num_comments}</span>
        <span className={voteCounterClass}>{voteCounter}</span>
        <Button type="button" className="upVote fas fa-caret-up" onClick={() => upVote(index)} />
      </Div>
      <Div className="news-content-wrapper">
        <span>{title }</span>
        <span className="domain">
          (
          {gethostname(url)}
          )
        </span>
        <span className="label-by">by</span>
        <span className="author">{author}</span>
        <span className="created"><ReactTimeAgo date={created_at} /></span>
        <Button type="button" className="btn-hide" onClick={() => hideRecord(index)}>[hide]</Button>
      </Div>
    </Fragment>
  );
}

export default News;

News.defaultProps = {
  post: {},
};
News.propTypes = {
  post: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
};
