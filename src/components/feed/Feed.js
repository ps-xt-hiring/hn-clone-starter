import React from 'react';
import axios from 'axios';
import FeedItem from './item/FeedItem';
import Storage from '../../utils/storage';
import Loading from '../loading/Loading';
import Config from '../../utils/config';

const API_BASE = 'http://hn.algolia.com/api/v1/';
const { CancelToken } = axios;
const source = CancelToken.source();

let hideItemsList = [];
let downvoteItemsList = [];

// for local storage checks
const { SET_ENV } = Config;

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: [],
      page: 0,
      loading: true,
    };

    this.hideItem = this.hideItem.bind(this);
    this.downvoteItem = this.downvoteItem.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  /**
   * Setting varibles with local store values and fetching feed on mounting phase
  */
  componentDidMount() {
    const obj = Storage.loadState();
    if (obj) {
      if (obj.hideItems) {
        hideItemsList = obj.hideItems;
      }
      if (obj.downvoteItems) {
        downvoteItemsList = obj.downvoteItems;
      }
    }

    const url = `${API_BASE}search_by_date?tags=front_page`;
    this.getFeed(url);
  }

  /**
   * Canceling the HTTP requests on unmount phase
  */
  componentWillUnmount() {
    source.cancel('Operation canceled by the user.');
  }

  /**
   * Fetching feed
   * @param {*} url
  */
  getFeed(url) {
    axios.get(url, {
      cancelToken: source.token,
    })
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          const { hits, page } = data;
          const feedLength = hits.length;
          let feed = [];

          // checking with local store
          if (SET_ENV === 'local') {
            for (let index = 0; index < feedLength; index += 1) {
              const item = hits[index];
              const indexOfDownVote = downvoteItemsList.indexOf(item.objectID);
              if (indexOfDownVote > -1) {
                item.downvote = true;
                item.points += 1;
              }
              const indexof = hideItemsList.indexOf(item.objectID);
              if (indexof === -1) {
                feed.push(item);
              }
            }
          } else {
            feed = [...hits];
          }

          this.setState({ feed, page, loading: false });
        } else {
          this.setState({ feed: [], loading: false });
        }
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          // request canceled
        } else {
          // handle error
        }
      });
  }

  /**
   * Downvote an item
   * @param {*} item
  */
  downvoteItem = (item) => {
    // storing to local store
    if (SET_ENV === 'local') {
      const indexOfDownVote = downvoteItemsList.indexOf(item.objectID);
      if (indexOfDownVote === -1) {
        downvoteItemsList.push(item.objectID);
      } else {
        downvoteItemsList.splice(indexOfDownVote, 1);
      }
      this.saveToLocal();
    } else {
      // TODO CALL API
    }
  }

  /**
   * Updating the local store with latest changes
   */
  saveToLocal = () => {
    Storage.saveState({
      hideItems: hideItemsList,
      downvoteItems: downvoteItemsList,
    });
  }

  /**
      * Loadmore functionality
  */
  loadMore() {
    let { page } = this.state;
    page += 1;
    const url = `${API_BASE}search_by_date?page=${page}`;
    this.setState({
      loading: true,
    });
    this.getFeed(url);
  }

  /**
 * Hiding an item
 * @param {*} item
*/
  hideItem(item) {
    const { feed, page } = this.state;
    const feedLength = feed.length;

    if (feedLength > 0) {
      for (let index = 0; index < feedLength; index += 1) {
        const feedItem = feed[index];

        if (feedItem.objectID === item.objectID) {
          feed.splice(index, 1);

          break;
        }
      }
    }

    // storing to local store
    if (SET_ENV === 'local') {
      hideItemsList.push(item.objectID);
      this.saveToLocal();
    } else {
      // TODO CALL API
    }

    this.setState({ feed, page, loading: false });
  }

  render() {
    const { feed, loading } = this.state;

    const moreButton = <button type="button" className="more-button" onClick={this.loadMore}> More </button>;
    let loadComponent = null;
    if (loading) {
      loadComponent = <Loading />;
    } else if (feed.length > 0) {
      loadComponent = (
        <>
          {
            feed.map(item => (
              <FeedItem
                data={item}
                key={item.objectID}
                hideItem={this.hideItem}
                downvoteItem={this.downvoteItem}
              />
            ))
          }
          { moreButton }
        </>
      );
    } else {
      loadComponent = <Loading message="No Content" />;
    }

    return (
      <div className="feed-list">
        {
          loadComponent
        }
      </div>
    );
  }
}

export default Feed;
