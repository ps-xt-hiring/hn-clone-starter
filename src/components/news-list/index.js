import React, { Component } from 'react';
import NewsListItem from '../news-list-item';
import Button from '../button';
import { updateLocalStorage } from '../../services/common';

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
    this.hideNewHandler = this.hideNewHandler.bind(this);
    this.upvoteHandler = this.upvoteHandler.bind(this);
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
    const hiddenItemList = JSON.parse(localStorage.getItem('hiddenItemsList'));

    const items = response.hits.map((item) => {
      const itemData = item;
      itemData.isHidden = false;
      itemData.isUpvoted = false;

      if (upvotedItemsList && upvotedItemsList.lastIndexOf(itemData.objectID) > -1) {
        itemData.isUpvoted = true;
        itemData.points += 1;
      }

      if (hiddenItemList && hiddenItemList.lastIndexOf(item.objectID) > -1) {
        itemData.isHidden = true;
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
    this.setState(state => (
      {
        isLoaded: false, pageNumber: state.pageNumber + 1
      }), () => {
        this.fetchNewsList(`${apiUrl + (this.state.pageNumber)}`);
      }
    );
  }

  // Function name: renderNewsList
  // Arguments: none
  // Check for previously hidden items and return items list elements to be rendered
  renderNewsList() {
    let { newsListItems } = this.state;

    const itemsNew = newsListItems.map(
      item => <NewsListItem key={item.objectID} item={item} upvoteHandler={this.upvoteHandler} hideNewHandler={this.hideNewHandler} />,
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
      loadmoreElm = <Button className="loadmore" onClick={this.loadmore}>more</Button>;
    }
    return loadmoreElm;
  }

  // Function name: hideNewHandler
  // Arguments: none
  // It triggers on hide button click which hides the current item and update the local storage
  hideNewHandler(objectID) {
    updateLocalStorage('hiddenItemsList', objectID);

    this.setState(state => ({
      newsListItems: state.newsListItems.map(
        item => {
          if (item.objectID === objectID) {
            item.isHidden = true;
          }
          return item;
        },
      ),
    }));
  }

  // Function name: upvoteHandler
  // Arguments: none
  // It triggers on upvote button click which counts a vote and update the local storage
  upvoteHandler(objectID) {
    updateLocalStorage('upvotedItemsList', objectID);

    this.setState(state => ({
      newsListItems: state.newsListItems.map(
        item => {
          if (item.objectID === objectID) {
            item.isUpvoted = true;
            item.points = item.points + 1;
          }
          return item;
        },
      ),
    }));
  }

  render() {
    const { error, isLoaded } = this.state;

    return (
      <>
      {
        error ? (
          <div> Error: {error.message} </div>
        ) : (
          !isLoaded ? (
            <div>Loading...</div>
          ) : (
            <>
              <ul className="news-list">
                {this.renderNewsList()}
              </ul>
              {this.renderLoadmore()}
            </>
          )
        )
      }
      </>
    );
  }
}
