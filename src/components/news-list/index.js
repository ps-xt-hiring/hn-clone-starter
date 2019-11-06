import React, { Component } from 'react';
import NewsListItem from '../news-list-item';

const apiUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=front_page&page=';

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsListItems: [],
      error: null,
      isLoaded: false,
      pageNumber: 0,
      totalPages: 0,
    };
    this.loadmore = this.loadmore.bind(this);
  }

  // Lifecycle method: componentDidMount
  // Fetch results from API on component load
  componentDidMount() {
    const { pageNumber } = this.state;
    this.fetchNewsList(`${apiUrl + pageNumber}`);
  }

  // Function name: fetchNewsList
  // Arguments: apiPath (API service url)
  // Call api and fetch response
  fetchNewsList(apiPath) {
    fetch(apiPath)
      .then(response => response.json())
      .then((response) => {
        this.resultsHandler(response);
      }, (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  // Function name: resultsHandler
  // Arguments: response (API response)
  // Take response, check for previous upvoted items and setState with updated items
  resultsHandler(response) {
    const upvotedItemsList = JSON.parse(localStorage.getItem('upvotedItemsList'));
    const items = response.hits.map((item) => {
      const itemData = item;
      if (upvotedItemsList && upvotedItemsList.lastIndexOf(itemData.objectID) > -1) {
        itemData.isUpvoted = true;
        itemData.points += 1;
      }
      return itemData;
    });

    this.setState({
      isLoaded: true,
      newsListItems: items,
      totalPages: response.nbPages,
    });
  }

  // Function name: loadmore
  // Arguments: none
  // It is called on loadmore button click which fetch next set of results
  loadmore() {
    let { pageNumber } = this.state;
    pageNumber += 1;
    this.fetchNewsList(`${apiUrl + pageNumber}`);
    this.setState({
      pageNumber: pageNumber + 1,
    });
  }

  // Function name: renderNewsList
  // Arguments: none
  // Check for previously hidden items and return items list elements to be rendered
  renderNewsList() {
    let { newsListItems } = this.state;
    const hiddenItemList = JSON.parse(localStorage.getItem('hiddenItemsList'));

    if (hiddenItemList) {
      newsListItems = newsListItems.filter(
        item => hiddenItemList.lastIndexOf(item.objectID) === -1,
      );
    }
    const itemsNew = newsListItems.map(
      item => <NewsListItem key={item.objectID} item={item} />,
    );

    return itemsNew;
  }

  // Function name: renderLoadmore
  // Arguments: none
  // Render loadmore button on the basis of total pages and current page counts
  renderLoadmore() {
    const { pageNumber, totalPages } = this.state;
    let loadmoreElm;
    if (pageNumber < totalPages - 1) {
      loadmoreElm = <button type="button" className="loadmore" onClick={this.loadmore}>more</button>;
    }
    return loadmoreElm;
  }

  render() {
    const { error, isLoaded } = this.state;
    let elm;

    if (error) {
      elm = (
        <div>
          Error:
          {error.message}
        </div>
      );
    } else if (!isLoaded) {
      elm = <div>Loading...</div>;
    } else {
      elm = (
        <>
          <ul className="news-list">
            {this.renderNewsList()}
          </ul>
          {this.renderLoadmore()}
        </>
      );
    }

    return elm;
  }
}
