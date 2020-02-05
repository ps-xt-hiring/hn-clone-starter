import React, { Component } from "react";
import Moment from "react-moment";
import styles from "./Feed.module.css";
import FeedHeader from "../../components/feed/Header";
import upvoteIcon from "../../assests/images/grayarrow.gif";
import { fetchFeedsData } from "../../actions/feed";
class FeedContainer extends Component {
  feedComponentMount = false;
  state = {
    loader: false,
    feedsData: [],
    selectedPage: 0,
    nbPages: null,
    categories: [
      {
        id: 1,
        active: true,
        key: "top",
        tag: "front_page"
      },
      {
        id: 2,
        active: false,
        key: "new",
        tag: null
      }
    ]
  };

  //get feed data
  getNewsFeeds = selectedCategory => {
    let updatedCategories = this.state.categories.map(category => {
      return {
        ...category,
        active: category.id === selectedCategory.id ? true : false
      };
    });
    this.setState(
      {
        categories: updatedCategories,
        selectedPage: 0,
        nbPages: null
      },
      () => {
        this.fetchFeedsHandler();
      }
    );
  };

  // load more feeds
  loadMoreFeeds = () => {
    this.setState(
      state => {
        return { selectedPage: state.selectedPage + 1 };
      },
      () => {
        this.fetchFeedsHandler();
      }
    );
  };

  //get domain name
  getDomainName = url => {
    return url ? `(${new URL(url).hostname})` : "";
  };

  // hide feed
  hideFeed = selectedFeed => {
    let hiddenFeeds = JSON.parse(localStorage.getItem("hiddenFeeds"));
    hiddenFeeds = hiddenFeeds ? hiddenFeeds : [];
    hiddenFeeds.push(selectedFeed.objectID);
    localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    let updatedFeedData = this.state.feedsData;
    updatedFeedData = updatedFeedData.filter(
      feed => feed.objectID !== selectedFeed.objectID
    );
    this.setState({
      feedsData: updatedFeedData
    });
  };

  // upvote feed
  upvote = selectedFeed => {
    if (selectedFeed.upvoted) {
      return;
    }
    let upvotedFeeds = JSON.parse(localStorage.getItem("upvotedFeeds"));
    upvotedFeeds = upvotedFeeds ? upvotedFeeds : [];
    upvotedFeeds.push(selectedFeed.objectID);
    localStorage.setItem("upvotedFeeds", JSON.stringify(upvotedFeeds));
    let updatedFeedData = this.state.feedsData;
    updatedFeedData = updatedFeedData.map(feed => {
      return {
        ...feed,
        upvoted: upvotedFeeds.indexOf(feed.objectID) < 0 ? false : true
      };
    });
    this.setState({
      feedsData: updatedFeedData
    });
  };

  componentDidMount() {
    let storedHiddenItems = JSON.parse(localStorage.getItem("hiddenFeeds"));
    let storedUpvoteItems = JSON.parse(localStorage.getItem("upvotedFeeds"));
    let hiddenFeeds = storedHiddenItems ? storedHiddenItems : [];
    let upvotedFeeds = storedUpvoteItems ? storedUpvoteItems : [];
    localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    localStorage.setItem("upvotedFeeds", JSON.stringify(upvotedFeeds));
    this.feedComponentMount = true;
    this.fetchFeedsHandler();
  }

  //fetch feeds
  fetchFeedsHandler = () => {
    this.setState({
      loader: true
    });

    let tagsForSelectedCat = this.state.categories.find(cat => cat.active).tag;

    fetchFeedsData(this.state.selectedPage, tagsForSelectedCat)
      .then(res => {
        if (this.feedComponentMount) {
          let hiddenFeeds = JSON.parse(localStorage.getItem("hiddenFeeds"));
          let upvotedFeeds = JSON.parse(localStorage.getItem("upvotedFeeds"));
          let filterdRes = res.hits;
          if (hiddenFeeds.length > 0 && filterdRes.length > 0) {
            filterdRes = res.hits.filter(function(e) {
              return this.indexOf(e.objectID) < 0;
            }, hiddenFeeds);
          }
          if (upvotedFeeds.length > 0 && filterdRes.length > 0) {
            filterdRes = filterdRes.map(function(feed) {
              return {
                ...feed,
                upvoted: this.indexOf(feed.objectID) < 0 ? false : true
              };
            }, upvotedFeeds);
          }
          this.setState({
            loader: false,
            feedsData: filterdRes,
            nbPages: res.nbPages
          });
        }
      })
      .catch(err => {
        if (this.feedComponentMount) {
          this.setState({
            loader: false,
            nbPages: null,
            feedsData: []
          });
        }
      });
  };

  componentWillUnmount() {
    this.feedComponentMount = false;
  }

  render() {
    const { categories, feedsData, loader, nbPages, selectedPage } = this.state;
    return (
      <React.Fragment>
        {loader && <div className="loader"></div>}
        <FeedHeader getNewsFeeds={this.getNewsFeeds} categories={categories} />
        <ul className={styles.feedListing}>
          {feedsData.length > 0 &&
            feedsData.map((feed, index) => (
              <li key={feed.objectID}>
                <div>
                  <span className={styles.comentCount}>
                    {feed.num_comments ? feed.num_comments : 0}
                  </span>
                </div>
                <div>
                  {" "}
                  <span
                    className={[
                      styles.upvoteCount,
                      feed.upvoted ? styles.upvoted : ""
                    ].join(" ")}
                  >
                    {feed.points
                      ? feed.upvoted
                        ? feed.points + 1
                        : feed.points
                      : feed.upvoted
                      ? 1
                      : 0}

<img
                    onClick={() => this.upvote(feed)}
                    className={styles.upvoteIcon}
                    src={upvoteIcon}
                    alt="upvote"
                  />
                  </span>{" "}
                 
                </div>
                <div>
                  {" "}
                  <span className={styles.feedTitle}> {feed.title}</span>
                  <span className={styles.feedDomain}>
                    {" "}
                    {this.getDomainName(feed.url)}{" "}
                  </span>
                  by
                  <span className={styles.feedAuthor}> {feed.author}</span>
                  <Moment className={styles.feedCreatedTime} fromNow>
                    {feed.created_at}
                  </Moment>
                  <span
                    onClick={() => this.hideFeed(feed)}
                    className={["cursorPointer", styles.hideFeed].join(" ")}
                  >
                    [hide]
                  </span>
                </div>
              </li>
            ))}
          {!loader &&
            feedsData.length > 0 &&
            nbPages &&
            nbPages > selectedPage + 1 && (
              <li className={styles.paginationContainer}>
                <div>
                  <span className={styles.comentCount}>&nbsp;</span>
                </div>
                <div>
                  <span className={styles.upvoteCount}>&nbsp;</span>
                </div>
                <div>
                  {" "}
                  <span className="cursorPointer" onClick={this.loadMoreFeeds}>
                    More
                  </span>
                </div>
              </li>
            )}
        </ul>
      </React.Fragment>
    );
  }
}

export default FeedContainer;
