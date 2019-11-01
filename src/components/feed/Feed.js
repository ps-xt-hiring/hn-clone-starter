import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewsItem from '../newsItem/NewsItem';
import { MORE_LABEL, LOADING_TEXT } from '../../constants';
import './feed.scss';

export default function Feed(props) {
  const [upvotedList, setUpvotedList] = useState([]);
  const [hiddenList, setHiddenList] = useState([]);
  const { feed, loadMore, isMore } = props;

  useEffect(() => {
    localStorage.clear();
    const upvotedListFromLS = JSON.parse(localStorage.getItem('upvotedNewsItems')) || [];
    const hiddenListFromLS = JSON.parse(localStorage.getItem('hiddenNewsItems')) || [];
    setUpvotedList(upvotedListFromLS);
    setHiddenList(hiddenListFromLS);
  }, []);


  const upvoteNewsItem = (newsItem) => {
    const newList = [...upvotedList];
    const index = newList.findIndex(item => item.objectID === newsItem.objectID);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(newsItem);
    }

    localStorage.setItem('upvotedNewsItems', JSON.stringify(newList));
    setUpvotedList(newList);
  };

  const hideNewsItem = (newsItem) => {
    const newList = [...hiddenList];
    const index = newList.findIndex(item => item.objectID === newsItem.objectID);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(newsItem);
    }

    localStorage.setItem('hiddenNewsItems', JSON.stringify(newList));
    setHiddenList(newList);
  };

  const getType = (post) => {
    const index = upvotedList ? upvotedList.findIndex(item => item.objectID === post.objectID) : -1;
    if (index >= 0) {
      return '\u25BC';
    }
    return '\u25B2';
  };

  const isHidden = (post) => {
    const index = hiddenList ? hiddenList.findIndex(item => item.objectID === post.objectID) : -1;
    if (index >= 0) {
      return false;
    }
    return true;
  };

  if (feed.length) {
    return (
      <main className="row feed">
        {feed.filter(post => isHidden(post))
          .map((item, index) => (
            <NewsItem
              key={item.objectID}
              newsItem={item}
              order={index}
              hideNewsItem={hideNewsItem}
              upvoteNewsItem={upvoteNewsItem}
              isUpvoted={getType(item)}
            />
          ))
        }
        {isMore
          && (
            <button type="button" className="btn-empty feed__more" onClick={loadMore}>
              {MORE_LABEL}
            </button>
          )
        }
      </main>
    );
  }
  return (
    <main className="row">
      <p>
        {LOADING_TEXT}
      </p>
    </main>
  );
}

Feed.propTypes = {
  feed: PropTypes.arrayOf(PropTypes.shape({
    num_comments: PropTypes.number,
    title: PropTypes.string,
    points: PropTypes.number,
    url: PropTypes.string,
    author: PropTypes.string,
    created_at: PropTypes.number,
  })),
  loadMore: PropTypes.func,
  isMore: PropTypes.bool,
};

Feed.defaultProps = {
  feed: [],
  loadMore: () => { },
  isMore: true,
};
