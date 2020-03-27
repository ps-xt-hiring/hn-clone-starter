import React from "react";
import axios from "axios";
import NewsListItem from "./NewsListItem";
import NewsHeader from "./NewsHeader";

let page = 1;

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      moreItemsExist: false,
      activeTab: 0
    };
  }

  componentDidMount() {
    this.getNewsList();
  }

  /**
   * fetch more news
   */
  nextNews() {
    page += 1;
    this.getNewsList(page, this.state.activeTab);
  }

  /**
   * returning hidden posts from local storage
   */
  getHiddenPost = () => {
    let hiddenItems = localStorage.getItem("hiddenItems");
    return hiddenItems ? JSON.parse(hiddenItems) : [];
  };

  /**
   * hide the news from feed
   */
  hidePost(data) {
    const id = data.newsData.objectID;
    const hiddenPost = this.getHiddenPost();
    hiddenPost.push(id);
    localStorage.setItem("hiddenItems", JSON.stringify(hiddenPost));

    let newsData = this.state.newsData.filter(val => {
      return val.objectID !== id;
    });
    this.setState({
      newsData
    });
  }
  /**
   * get visisible news
   */
  getVisibleNews = hits => {
    let hiddenItems = localStorage.getItem("hiddenItems");
    if (hiddenItems) {
      hiddenItems = JSON.parse(hiddenItems);
      hits = hits.filter(val => {
        return hiddenItems.indexOf(val.objectID) === -1;
      });
    }
    return hits;
  };

  isItemExists(hits) {
    return hits ? true : false;
  }

  getNewsList(page = 1, tab = 0) {
    let { moreItemsExist } = this.state;
    let url;
    if (tab === 0) {
      url = `https://hn.algolia.com/api/v1/search?page=${page}`;
    } else {
      url = `https://hn.algolia.com/api/v1/search_by_date?query=recent&page=${page}`;
    }
    axios.get(url).then(res => {
      let hits = res.data.hits;
      hits = this.getVisibleNews(hits);
      moreItemsExist = this.isItemExists(hits);
      this.setState({
        newsData: hits,
        moreItemsExist,
        activeTab: tab
      });
    });
  }

  getActiveTabData(i) {
    const tab = i;
    page = 1;
    this.getNewsList(1, tab);
  }

  render() {
    const { newsData, moreItemsExist, activeTab } = this.state;
    return (
      <React.Fragment>
        <NewsHeader
          activeTab={activeTab}
          getActiveTabData={this.getActiveTabData.bind(this)}
        />

        <ul className="feed-news">
          {newsData.map(val => (
            <NewsListItem
              key={val.objectID}
              hidePost={event => this.hidePost(event)}
              newsData={val}
            />
          ))}
        </ul>

        {moreItemsExist ? (
          <button className="more-btn" onClick={() => this.nextNews()}>
            More
          </button>
        ) : null}
      </React.Fragment>
    );
  }
}

export default NewsFeed;
