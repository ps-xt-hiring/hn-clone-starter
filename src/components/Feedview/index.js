import React from 'react';
import Feed from '../Feed';

import './feedview.css';
import logo from '../../y18.gif';

function getQueryStringValue(key) {
  return decodeURIComponent(window.location.search.replace(new RegExp(`^(?:.*[&\\?]${encodeURIComponent(key).replace(/[.+*]/g, '\\$&')}(?:\\=([^&]*))?)?.*$`, 'i'), '$1'));
}

class Feedview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: [],
      page: 0,
      hiddenFeeds: [],
      disableMore: false,
      isLoad: false,
    };

    this.upvotesArr = [];

    this.upvote = this.upvote.bind(this);
    this.hideFeed = this.hideFeed.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoad: true,
      hiddenFeeds: JSON.parse(localStorage.getItem('hiddenFeeds') || '[]'),
    });

    this.fetchData();
  }

  fetchData() {
    const pageNum = getQueryStringValue('page') || 0;
    const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`;

    fetch(url).then(res => res.json()).then((data) => {
      const { hiddenFeeds } = this.state;
      if (hiddenFeeds.length > 0) {
        const low = Math.min(...hiddenFeeds);
        const url2 = `${url}&numericFilters=created_at_i<${low}`;
        fetch(url2).then(r => r.json()).then((d) => {
          const prevRes = data.hits.filter(f => (hiddenFeeds.indexOf(f.created_at_i) < 0));
          prevRes.push(...d.hits.slice(0, 20 - prevRes.length));
          this.syncLocalStorage(prevRes, pageNum);
        });
      } else {
        this.syncLocalStorage(data.hits, pageNum);
      }
    }).catch(() => {

    });
  }

  syncLocalStorage(feeds, page) {
    this.upvotesArr = JSON.parse(localStorage.getItem('upvotes') || '[]');

    const feedArr = [];
    feeds.forEach((feed) => {
      const feedObj = { ...feed };
      feedObj.points = feed.points || 0;
      if (this.upvotesArr.indexOf(feedObj.objectID) >= 0) {
        feedObj.points += 1;
      }
      feedArr.push(feedObj);
    });

    this.setState({
      feeds: feedArr,
      isLoad: false,
      page,
    });
  }

  upvote(objectID) {
    const { feeds } = this.state;
    const feedObj = feeds.filter(f => f.objectID === objectID)[0];
    if (this.upvotesArr.indexOf(objectID) >= 0) {
      feedObj.points -= 1;
      this.upvotesArr.splice(this.upvotesArr.indexOf(objectID), 1);
    } else {
      feedObj.points += 1;
      this.upvotesArr.push(objectID);
    }
    this.setState({
      feeds: [...feeds],
    });
    localStorage.setItem('upvotes', JSON.stringify(this.upvotesArr));
  }

  hideFeed(createdTime) {
    const { hiddenFeeds } = this.state;
    if (hiddenFeeds.indexOf(createdTime) < 0) {
      hiddenFeeds.push(createdTime);
    }
    localStorage.setItem('hiddenFeeds', JSON.stringify(hiddenFeeds));
    this.setState({
      hiddenFeeds: [...hiddenFeeds],
    });
    this.fetchData();
  }

  render() {
    const {
      isLoad, disableMore, feeds, page,
    } = this.state;
    return (
      <div className="feedsTable">
        {
                    isLoad
                      ? <div className="loader">Loading...</div>
                      : (
                        <table>
                          <thead>
                            <tr>
                              <td className="header" colSpan="3">
                                <img alt="logo" src={logo} />
                                <span className="topNavLinks">
                                  <a href="/top">top</a>
                                            |
                                  <a href="/new">new</a>
                                </span>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            { feeds.map(feed => (
                              <tr key={`feed-${feed.objectID}`} className="feedContainer">
                                <Feed
                                  feed={feed}
                                  upvote={this.upvote}
                                  hide={this.hideFeed}
                                  isUpvoted={this.upvotesArr.indexOf(feed.objectID) >= 0}
                                />
                              </tr>
                            ))
                                }
                          </tbody>
                          <tfoot>
                            <tr className="feedContainer">
                              <td colSpan="3">
                                {!disableMore && <a href={`?page=${parseInt(page, 10) + 1}`} className="moreButton">More</a>}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      )
                }
      </div>
    );
  }
}

export default Feedview;
