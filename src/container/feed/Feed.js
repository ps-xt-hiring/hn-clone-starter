import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import styles from "./Feed.module.css";
import FeedHeader from "../../components/feed/Header";
import upvoteIcon from "../../assests/images/grayarrow.gif";
import { fetchFeedsData } from "../../actions/feed";
const FeedContainer = () => {
  const [loader, setLoader] = useState(false);
  const [feedsData, setFeedsData] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [nbPages, setNBPages] = useState(null);
  const [categories, setCategoriesData] = useState([
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
  ]);

  //set navigation selection
  const getNewsFeeds = selectedCategory => {
    let updatedCategories = categories.map(category => {
      return {
        ...category,
        active: category.id === selectedCategory.id ? true : false
      };
    });

    setCategoriesData(updatedCategories);
    setSelectedPage(0);
    setNBPages(null);
  };

  // load more feeds
  const loadMoreFeeds = () => {
    setSelectedPage(prevState => prevState + 1);
  };

  // hide feed
  const hideFeed = selectedFeed => {
    let hiddenFeeds = JSON.parse(localStorage.getItem("hiddenFeeds")) || [];
    hiddenFeeds.push(selectedFeed.objectID);
    localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    let updatedFeedData = feedsData;
    updatedFeedData = updatedFeedData.filter(
      feed => feed.objectID !== selectedFeed.objectID
    );
    setFeedsData(updatedFeedData);
  };

  // upvote feed
  const upvote = selectedFeed => {
    if (selectedFeed.upvoted) {
      return;
    }
    let upvotedFeeds = JSON.parse(localStorage.getItem("upvotedFeeds")) || [];
    upvotedFeeds.push(selectedFeed.objectID);
    localStorage.setItem("upvotedFeeds", JSON.stringify(upvotedFeeds));
    let updatedFeedData = feedsData;
    updatedFeedData = updatedFeedData.map(feed => {
      return {
        ...feed,
        upvoted: upvotedFeeds.indexOf(feed.objectID) < 0 ? false : true
      };
    });
    setFeedsData(updatedFeedData);
  };

  //fetch feeds
  const fetchFeedsHandler = () => {
    setLoader(true);
    let tagsForSelectedCat = categories.find(cat => cat.active).tag;
    fetchFeedsData(selectedPage, tagsForSelectedCat)
      .then(res => {
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
        setLoader(false);
        setFeedsData(filterdRes);
        setNBPages(res.nbPages);
      })
      .catch(err => {
        setLoader(false);
        setFeedsData([]);
        setNBPages(null);
      });
  };

  //get domain name
  const getDomainName = url => {
    return url ? `(${new URL(url).hostname})` : "";
  };

  // on did mount
  useEffect(() => {
    let storedHiddenItems = JSON.parse(localStorage.getItem("hiddenFeeds"));
    let storedUpvoteItems = JSON.parse(localStorage.getItem("upvotedFeeds"));
    let hiddenFeeds = storedHiddenItems ? storedHiddenItems : [];
    let upvotedFeeds = storedUpvoteItems ? storedUpvoteItems : [];
    localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    localStorage.setItem("upvotedFeeds", JSON.stringify(upvotedFeeds));
  }, []);

  // get feeds data
  useEffect(() => {
    fetchFeedsHandler();
  }, [categories, selectedPage]);

  return (
    <React.Fragment>
      {loader && <div className="loader"></div>}
      <FeedHeader getNewsFeeds={getNewsFeeds} categories={categories} />
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
                    onClick={() => upvote(feed)}
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
                  {getDomainName(feed.url)}{" "}
                </span>
                by
                <span className={styles.feedAuthor}> {feed.author}</span>
                <Moment className={styles.feedCreatedTime} fromNow>
                  {feed.created_at}
                </Moment>
                <span
                  onClick={() => hideFeed(feed)}
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
                <span className="cursorPointer" onClick={loadMoreFeeds}>
                  More
                </span>
              </div>
            </li>
          )}
      </ul>
    </React.Fragment>
  );
};

export default FeedContainer;
