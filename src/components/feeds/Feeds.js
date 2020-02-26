import React from 'react';
import PropTypes from 'prop-types';
import FeedItem from '../feedItem/FeedItem';
import useBrowserStorage from '../../utilities/browserStorage';
import { MORE_LABEL } from '../../constants';
import './feeds.scss';
import { useSelector } from 'react-redux';

export default function Feed(props) {
  const [upvotedList, setUpvotedList] = useBrowserStorage('upvotedFeedItems', []);
  const [hiddenList, setHiddenList] = useBrowserStorage('hiddenFeedItems', []);
  const {  loadMore, hasMore } = props;
  const feed = useSelector(state=>state.feeds);
  const isLoading = useSelector(state=>state.isLoading);
  
  const upvoteFeedItem = (feedItem) => {
    const newList = [...upvotedList];
    const index = newList.findIndex(item => item.objectID === feedItem.objectID);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(feedItem);
    }

    setUpvotedList(newList);
  };

  const hideFeedItem = (feedItem) => {
    const newList = [...hiddenList];
    const itemIndex = newList.findIndex(item => item.objectID === feedItem.objectID);
    if (itemIndex >= 0) {
      newList.splice(itemIndex, 1);
    } else {
      newList.push(feedItem);
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
     
      {feed.length && !isLoading
        ? (
          <>
            {feed.filter(post => isHidden(post))
              .map((item, index) => (
                <FeedItem
                  key={item.objectID}
                  feedItem={item}
                  order={index}
                  hideFeedItem={hideFeedItem}
                  upvoteFeedItem={upvoteFeedItem}
                  isUpvoted={getType(item)}
                />
              ))
            }
            {hasMore
              && (
                <button type="button" className="btn-empty feed__more" onClick={loadMore}>
                  {MORE_LABEL}
                </button>
              )
            }
          </>
        )
        : (
          <p>
            <span className={isLoading?'loader':'hide'}>
              
            </span>
          </p>
        )
      }
    </main>
  );
}

Feed.propTypes = {
  
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
};

Feed.defaultProps = {
  
  loadMore: () => { },
  hasMore: true,
};
