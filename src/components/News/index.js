/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import {
  getDomainFromUrl, getTimeDuration, getVote, setUpVote,
} from '../../utils/helper';
import {
  CommentCount, Votes, Title, Domain, Author, Duration, HideBtn, UpVoteBtn,
  HideBtnWrapper, VotesWrapper, Article,
} from '../Styled';

const News = ({ news = {}, hideNews }) => {
  const {
    objectID, title, url, points, author,
  } = news;

  const [votes, setVotes] = useState(getVote(objectID) || points);
  /**
     * Upvote and re-render.
     */
  const upVote = () => {
    setUpVote(objectID, points);
    setVotes(getVote(objectID));
  };

  if (!title && !url) {
    return null;
  }

  return (
    <li className="news-row">
      <Article>
        <div aria-label="Meta Information" className="metaInfo">
          <CommentCount title={`${news.num_comments || 0} Comments`}>{news.num_comments || 0}</CommentCount>
          <VotesWrapper>
            <Votes title={`${votes || 0} Votes`}>
              {' '}
              {votes || 0}
            </Votes>
            <UpVoteBtn className="upvote" title="Click to upvote" onClick={upVote} />
          </VotesWrapper>
        </div>
        <div aria-label="Main Information" className="mainInfo">
          <Title href={url}>{title}</Title>
          {url && (
            <Domain href={url}>
              (
                {getDomainFromUrl(url)}
              )
            </Domain>
          )}
          {author
            && (
              <Author>
                by
                <span title={`Written by ${author}`}>{author}</span>
              </Author>
            )
          }
          {news.created_at && (
            <Duration title={`Posted ${getTimeDuration(news.created_at)}`}>
              {' '}
              {getTimeDuration(news.created_at)}
              {' '}
            </Duration>
          )}
          <HideBtnWrapper title="Click to hide this news." onClick={() => hideNews(objectID)}>
            [
            <HideBtn> hide </HideBtn>
            ]
          </HideBtnWrapper>
        </div>
      </Article>
    </li>
  );
};

export default News;
