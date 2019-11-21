import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';

import serachNews  from './services/ApiServices'

function App() {
  const [page, setPage] = useState(1);
  const [storyCount, setStoryCount] = useState(0);
  const [activeHeader, setActiveHeader] = useState('top');
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMore = () => {
    setIsLoading(true);
    setPage(page + 1);
    setStories([]);
    setStoryCount(storyCount + stories.filter(({url}) => url).length)
  };

  useEffect(() => {
    serachNews({param: 'page', value: page})
      .then(res => res.json())
      .then(({hits}) => {
        setStories(hits.filter(({ url }) => url));
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page]);

  const loadTopNews = () => {
    setPage(1);
    setStoryCount(0);
    setActiveHeader('top');
  };
  
  const loadNewestNews = () => {
    setPage(1);
    setStoryCount(0);
    setActiveHeader('new');
  };

  return (
    <div className="news">
      {/* header with options */}
      <div className="header">
        <div className="logo">Y</div>
        <div className="options">
          <span className={`${activeHeader === 'top' ? 'active' : ''}`} onClick={loadTopNews}>top</span>
          <span className={`${activeHeader === 'new' ? 'active' : ''}`} onClick={loadNewestNews}>new</span>
        </div>
      </div>

      {/* list out all stories on current page */}
      <div className="stories">
        {isLoading ? <p>Loading...</p> : stories
          .map(({ url, created_at, created_at_i, title, author, points }, index) => (
            <div className="story" key={`${created_at_i}-${index}`}>
              <div className="index">{index + 1 + storyCount}</div>
              <div className="details">
                <div className="upvote">{points}</div>
                <div className="title">
                  <a target="_blank" rel="noopener noreferrer" href={url}>{title}</a>
                </div>
                <div className="url">
                  <a target="_blank" rel="noopener noreferrer" href={new URL(url).hostname}>{new URL(url).hostname}</a>
                </div>
                <div className="author">
                  <span>{author}</span>
                </div>
                <div className="age">{moment(created_at).fromNow()}</div>
                <div className="hide">
                  <span>hide</span>
                </div>
              </div>
            </div>
        ))}

        {/* provide option to load next page stories */}
        {stories.length !== 0 && (
          <span className="load-more" onClick={loadMore}>More</span>
        )}
      </div>
    </div>
  );
}

export default App;
