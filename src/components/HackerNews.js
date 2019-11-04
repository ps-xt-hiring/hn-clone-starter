import * as React from 'react';
import fetchData from '../api';

export default class HackerNews extends React.Component {
  static updateDataWithLS(data) {
    return data.map((news) => {
      const item = news;
      const objID = item.objectID;
      if (localStorage.getItem(`${objID}_points`)) {
        item.points = localStorage.getItem(`${item.objectID}_points`);
      }
      if (localStorage.getItem(`${objID}_hidden`)) {
        item.hidden = true;
      }
      return item;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      filter: 'top',
      pageNumber: 1,
      items: [],
    };
    this.updateFilter = this.updateFilter.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.loadMoreNews = this.loadMoreNews.bind(this);
    this.getApiData = this.getApiData.bind(this);
    this.gotoHomePage = this.gotoHomePage.bind(this);
    this.hideNews = this.hideNews.bind(this);
  }

  componentDidMount() {
    const { pageNumber } = this.state;
    const query = `page=${pageNumber}`;
    this.getApiData(query);
  }

  getApiData(query) {
    const { pageNumber } = this.state;
    this.setState({
      isLoaded: false,
    });

    fetchData(query).then((news) => {
      const updatedNews = HackerNews.updateDataWithLS(news);
      this.setState({
        isLoaded: true,
        items: updatedNews,
        pageNumber: pageNumber + 1,
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error,
      });
    });
  }

  static getTimeDiff(createdAt) {
    const timestamp = new Date(createdAt).getTime();
    const currentTimestamp = new Date().getTime();

    let difference = currentTimestamp - timestamp;

    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    if (daysDifference && daysDifference > 0) {
      if (daysDifference >= 365) {
        return `${Math.floor(daysDifference / (30 * 12))} years ago`;
      }
      if (daysDifference >= 30) {
        return `${Math.floor(daysDifference / 30)} months ago`;
      }
      return `${daysDifference} days ago`;
    }
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    if (hoursDifference && hoursDifference > 0) return `${hoursDifference} hours ago`;
    difference -= hoursDifference * 1000 * 60 * 60;

    const minutesDifference = Math.floor(difference / 1000 / 60);
    if (minutesDifference && minutesDifference > 0) return `${minutesDifference} minutes ago`;
    difference -= minutesDifference * 1000 * 60;

    const secondsDifference = Math.floor(difference / 1000);

    return `${secondsDifference} seconds ago`;
  }

  updateFilter(evt) {
    this.setState({
      filter: evt.target.id,
    });
  }

  handleUpvote(evt) {
    evt.persist();
    const index = evt.target.dataset.idx;
    const { items } = this.state;
    items[index].points = Number(items[index].points) + 1;
    this.setState({
      items,
    });
    // set updated points in local storage
    localStorage.setItem(`${items[index].objectID}_points`, items[index].points);
  }

  hideNews(evt) {
    evt.persist();
    const index = evt.target.dataset.idx;
    const { items } = this.state;
    items[index].hidden = true;
    this.setState({
      items,
    });
    localStorage.setItem(`${items[index].objectID}_hidden`, true);
  }

  loadMoreNews() {
    const { pageNumber } = this.state;
    const query = `page=${pageNumber}`;
    this.getApiData(query);
  }

  gotoHomePage() {
    const { pageNumber } = this.state;
    this.setState({
      pageNumber: 1,
    }, () => {
      const query = `page=${pageNumber}`;
      this.getApiData(query);
    });
  }

  render() {
    const {
      error, isLoaded, items, filter,
    } = this.state;
    if (error) {
      return <div>Error</div>;
    } if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="News-feeds">
        <div className="App-header">
          <div className="App-header-y" role="button" tabIndex="0" onClick={this.gotoHomePage} onKeyDown={this.gotoHomePage}>Y</div>
          <div className="App-header-links">
            <span id="top" role="button" tabIndex="0" className={filter === 'top' ? 'active' : ''} onClick={this.updateFilter} onKeyDown={this.updateFilter}>
              top
            </span>
            <span>|</span>
            <span id="new" tabIndex="0" role="button" className={filter === 'new' ? 'active' : ''} onClick={this.updateFilter} onKeyDown={this.updateFilter}>
              new
            </span>
          </div>
        </div>
        <div className="App-content-area">
          {
            items.map((news, index) => {
              const {
                title,
                url,
                author,
                points,
                num_comments: nComments,
                created_at: createdAt,
                objectID,
              } = news;
              const publishedTime = HackerNews.getTimeDiff(createdAt);
              return (
                <div style={{ display: news.hidden ? 'none' : 'flex' }} key={objectID} className="News">
                  <div className="Comments-count">{nComments === null ? 0 : nComments}</div>
                  <div className="Upvotes">
                    <div className="Upvotes-count">{points === null ? 0 : points}</div>
                    <div data-idx={index} tabIndex="0" role="button" className="Upvotes-action arrow-up" onClick={this.handleUpvote} onKeyDown={this.handleUpvote} />
                  </div>
                  <div className="News-content">
                    <span className="News-title">{title}</span>
                    <a href={url} className="News-domain">{url}</a>
                    <span>by</span>
                    <a href="/">
                      <span className="News-username">{author}</span>
                    </a>
                    <span className="News-time">{publishedTime}</span>
                    <span data-idx={index} tabIndex="0" role="button" className="News-hide" onClick={this.hideNews} onKeyDown={this.hideNews}>
                      [ hide ]
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="App-footer">
          {isLoaded && <span tabIndex="0" className="Load-more" role="button" onClick={this.loadMoreNews} onKeyDown={this.loadMoreNews}>More</span>}
        </div>
      </div>
    );
  }
}
