import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import './App.css';

import serachNews from './services/ApiServices';
import { getLocalStorage, setLocalStorage } from './services/LocalStorageService';

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
    setStoryCount(storyCount + stories.filter(({ url }) => url).length);
  };

  useEffect(() => {
    serachNews({ param: 'page', value: page })
      .then(res => res.json())
      .then(({ hits }) => {
        const validNews = hits.filter(({ url }) => url);
        validNews.forEach((news) => {
          const storedValue = JSON.parse(getLocalStorage(news.objectID));
          if (storedValue) {
            news.isUpvoted = news.points !== parseInt(storedValue.points, 10);
            news.points = storedValue.points;
            news.isHidden = storedValue.isHidden;
          } else {
            setLocalStorage({ storyId: news.objectID, points: news.points })
          }
        });
        setStories(validNews);
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

  const upvoteStory = (storyId) => {
    const updatedStories = [...stories].reduce((acc, story) => {
      const s = { ...story };
      if (s.objectID === storyId) {
        s.points += s.points;
        s.isUpvoted = true;

        const storedValue = JSON.parse(getLocalStorage(story.objectID));
        setLocalStorage({ storyId: story.objectID, points: s.points, isHidden: storedValue.isHidden });
      }
      acc.push(s);
      return acc;
    }, []);
    setStories(updatedStories);
  };

  const hideStory = (storyId) => {
    const updatedStories = [...stories].reduce((acc, story) => {
      const s = { ...story }
      if (s.objectID === storyId) {
        s.isHidden = true;

        const storedValue = JSON.parse(getLocalStorage(story.objectID));
        setLocalStorage({ storyId: story.objectID, points: storedValue.points, isHidden: true });
      }
      acc.push(s);
      return acc;
    }, []);
    setStories(updatedStories);
  };

  return (
    <div className="news">
      {/* header with options [TODO: make it a saparate Component] */}
      <div className="header">
        <div className="logo">Y</div>
        <div className="options">
          <span className={`${(activeHeader === 'top') && 'active'}`} role="option" onClick={loadTopNews}>top</span>
          <span className={`${(activeHeader === 'new') && 'active'}`} role="option" onClick={loadNewestNews}>new</span>
        </div>
      </div>

      {/* list out all stories on current page [TODO: make it a saparate Component] */}
      <div className="stories">
        {isLoading ? <p>Loading...</p> : stories
          .map(({
            url,
            created_at,
            created_at_i,
            title,
            author,
            points,
            objectID,
            isUpvoted,
            isHidden,
          }, index) => (
            <Fragment key={`${created_at_i}-${index}`}>
              {!isHidden &&
                <div className={`story ${isHidden && 'hidden'}`}>
                  <div className="index">{index + 1 + storyCount}</div>
                  <div className="details">
                    <div className={`upvote ${isUpvoted && 'upvoted'}`} onClick={() => upvoteStory(objectID)}>{points}</div>
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
                      <span onClick={() => hideStory(objectID)}>hide</span>
                    </div>
                  </div>
                </div>
              }
            </Fragment>
          ))}

        {/* provide option to load next page stories */}
        {stories.length !== 0 && (
          <span className="load-more" role="button" onClick={loadMore}>More</span>
        )}
      </div>
    </div>
  );
}

export default App;
