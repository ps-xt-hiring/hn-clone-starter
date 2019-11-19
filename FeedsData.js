import React, { Component } from 'react';
import Moment from 'react-moment';
import './feeds.css';
import Upvote from './Upvote';

class FeedsData extends Component {
  constructor() {
    super();
    this.state = {
      feeds: [],
      page: 0,
      isHide: false,
    };

    this.loadMore = this.loadMore.bind(this);
    this.handleHideButtonClick = this.handleHideButtonClick.bind(this);
  }

  componentDidMount() {
    this.getFeed();
  }

  getFeed() {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    const { feedList, page, isHide } = this.state;

    return fetch(`https://hn.algolia.com/api/v1/search?page=${page}`)
      .then(results => results.json())
      .then((data) => {
        if (data.hits.length > 0) {
          const feeds = data.hits.map((feed) => {
            if (feed.title && feed.url) {
              const linkDomainUrl = new URL(feed.url);
              const linkDomain = linkDomainUrl.hostname;
              const feedPostedDate = feed.created_at;
              const feedObj = Object.assign({},
                feedList);
              const feedObjArray = Object.keys(feedObj).map(
                i => feedObj[i],
              );

              feedObjArray.push(feed);

              return (
                <div key={feed.objectID} id={feed.objectID} className="feedItem" value={isHide}>
                  <span className="comments-num">
                    {feed.num_comments}
                  </span>
                  <span className="upvote">
                    <Upvote />
                  </span>
                  <span
                    className="feed-title"
                    data-story-title={feed.story_title}
                  >
                    {feed.title}
                  </span>
                  <span className="link-domain">
                (
                    <span>{linkDomain}</span>
                )
                  </span>
                  <span className="by"> by</span>
                  <span className="author">
                    {' '}
                    {feed.author}
                    {' '}
                  </span>
                  <span className="timestamp">
                    <Moment fromNow>
                      {feedPostedDate}
                    </Moment>
                  </span>
                  <span className="hide">
                    [
                    <button type="button" id={feed.objectID} onClick={this.handleHideButtonClick.bind(this, feed.objectID)}>hide</button>
                    ]
                  </span>
                </div>
              );
            }
            return '';
          });

          this.setState({
            feeds,
          });
          return true;
        }
        document.querySelectorAll('.loadMore')[0].hidden = true;
        return false;
      });
  }

  handleHideButtonClick(elemId) {
    const { feeds } = this.state;
    const deletedFeeds = feeds.filter(delFeed => delFeed.key === elemId);
    const remainingFeeds = feeds.filter(feed => feed.key !== elemId);
    this.setState((prev) => {
      const hiddenFeeds = prev.hiddenFeeds.concat(deletedFeeds);
      localStorage.setItem('hidden-feeds', JSON.stringify(hiddenFeeds));
      return {
        feeds: remainingFeeds,
        hiddenFeeds,
      };
    });
  }

  loadMore() {
    this.setState(prev => ({ visible: prev.visible + 1 }));
    this.getFeed();
  }

  render() {
    const { feeds, page } = this.state;
    return (
      <div className="container">
        <div className="feedsList" key={page}>
          {feeds}
        </div>
        <div className="loadMore">
          <button type="button" onClick={this.loadMore} className="loadMoreBtn">
            More
          </button>
        </div>
      </div>
    );
  }
}

export default FeedsData;
