import React, { useState, useEffect } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

import serachNews  from './services/ApiServices'

function App() {
  const [page, setPage] = useState(1);
  const [storyCount, setStoryCount] = useState(0);
  const [activeHeader, setActiveHeader] = useState('top');
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMore = () => {
    setPage(page + 1);
    setStoryCount(storyCount + stories.filter(({url}) => url).length)
  };

  useEffect(() => {
    serachNews({param: 'page', value: page})
      .then(res => res.json())
      .then(({hits}) => {
        setStories(hits);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page]);

  const loadTopNews = () => {
    setPage(1);
    setActiveHeader('top');
  };
  
  const loadNewestNews = () => {
    setPage(1);
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
          .filter(({ url }) => url) // show stories with valid URL only
          .map(({ url, created_at, created_at_i, title, author, points }, index) => (
            <div className="story" key={`${created_at_i}-${index}`}>
              <div className="index">{index + 1 + storyCount}</div>
              <div className="details">
                <div className="upvote">{points}</div>
                <div className="title">
                  <a target="_blank" href={url}>{title}</a>
                </div>
                <div className="url">
                  <a target="_blank" href={new URL(url).hostname}>{new URL(url).hostname}</a>
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
