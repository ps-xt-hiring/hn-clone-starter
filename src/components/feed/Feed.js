import React from 'react';
import PropTypes from 'prop-types';
import NewsItem from '../newsItem/NewsItem';
import useLocalStorage from '../../utilities/localStorage';
import { MORE_LABEL, LOADING_TEXT } from '../../constants';
import './feed.scss';

export default function Feed(props) {
  const [upvotedList, setUpvotedList] = useLocalStorage('upvotedNewsItems', []);
  const [hiddenList, setHiddenList] = useLocalStorage('hiddenNewsItems', []);
  const { feed, loadMore, isMore } = props;

  const upvoteNewsItem = (newsItem) => {
    const newList = [...upvotedList];
    const index = newList.findIndex(item => item.objectID === newsItem.objectID);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(newsItem);
    }

    setUpvotedList(newList);
  };

  const hideNewsItem = (newsItem) => {
    const newList = [...hiddenList];
    const itemIndex = newList.findIndex(item => item.objectID === newsItem.objectID);
    if (itemIndex >= 0) {
      newList.splice(itemIndex, 1);
    } else {
      newList.push(newsItem);
    }

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

  return (
    <main className="container-wrapper feed">
      {feed.length
        ?
        (
          <>
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
          </>
        )
        :
        (
          <p>
            {LOADING_TEXT}
          </p>
        )
      }
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
    created_at: PropTypes.string,
  })),
  loadMore: PropTypes.func,
  isMore: PropTypes.bool,
};

Feed.defaultProps = {
  feed: [],
  loadMore: () => { },
  isMore: true,
};
