import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import serachNews  from './services/ApiServices'

function App() {
  const [page, setPage] = useState(1);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    serachNews({param: 'page', value: page})
      .then(res => res.json())
      .then(response => {
        console.log('response => ', response);
        
        setStories(response.hits);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page]);

  return (
    <>
      {isLoading && <p>Loading...</p>}

      <div className="news">
        {/* header with options */}
        <div className="header">
          <div className="logo">Y</div>
          <div className="options">
            <span>top</span>
            <span>new</span>
          </div>
        </div>

        {/* list out all stories on current page */}
        <div className="stories">
          {stories.map((story, index) => (
            <div className="story" key={story.objectID}>
              {/* count */}
              <div className="index">{index + 1}</div>
              {/* upvote */}
              <div className="upvote">{story.points}</div>
              {/* title */}
              <div>
                <a className="headline" href={story.url}>{story.title}</a>
              </div>
              {/* website */}
              <div className="url">{index + 1}</div>
              {/* author */}
              <div className="author">{story.author}</div>
              {/* age */}
              <div className="age">{story.created_at}</div>
              {/* hide */}
              <div className="hide">hide</div>
            </div>
          ))}

          {/* provide option to load next page stories */}
          {stories.length !== 0 && (
            <span onClick={loadMore}>More</span>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
