import React from 'react';

import axios from 'axios';
import NewsItem from '../news-item/news-item';

export default class NewsList extends React.Component {
  constructor() {
    super();
    this.state = {
      pageNo: 1,
      newsList: [],
      loading: false,
      loadMore: false,
    };
  }

  componentDidMount() {
    this.getNewsListData();
  }

  getNewsListData() {
    axios.get(`http://hn.algolia.com/api/v1/search_by_date?page=${this.state.pageNo}&numericFilters=num_comments>10,points>10`)
      .then((res) => {
        let result = res.data.hits;
        let hideNewsList = localStorage.getItem('hideNewsList');
        if (hideNewsList) {
          hideNewsList = JSON.parse(hideNewsList);
          result = result.filter(val => hideNewsList.indexOf(val.objectID) === -1);
        }

        const { newsList } = this.state;
        const lastNewsList = [...newsList];

        const updatedNewsList = lastNewsList.concat(result);
        this.setState({
          newsList: updatedNewsList,
          loading: true,
          loadMore: false,
        });
      });
  }

  loadMore() {
    const { pageNo } = this.state;
    this.setState({
      pageNo: pageNo + 1,
      loadMore: true,
    });
    this.getNewsListData();
  }

  hideItem(data) {
    const objectId = data.data.objectID;
    let hideNewsList = localStorage.getItem('hideNewsList');
    if (hideNewsList) {
      hideNewsList = JSON.parse(hideNewsList);
    } else {
      hideNewsList = [];
    }
    hideNewsList.push(objectId);
    localStorage.setItem('hideNewsList', JSON.stringify(hideNewsList));
    const { newsList } = this.state;
    let filteredNewsList = [...newsList];
    filteredNewsList = newsList.filter(val => val.objectID !== objectId);
    this.setState({
      newsList: filteredNewsList,
    });
  }

  render() {
    const { newsList, loading, loadMore } = this.state;
    return (
      <section className="news-list-wrapper">
        <ul className="news-list">
          {newsList.map(val => (
            <NewsItem key={val.created_at_i} hideItem={$event => this.hideItem($event)} newsData={val} />
          ))}
        </ul>
        {
          loading && loadMore ? <div className="load-more-btn">Loading..</div> : null
        }
        {
          loading && !loadMore
            ? <button onClick={() => this.loadMore()} onKeyDown={this.handleClick} type="button" className="load-more-btn">More</button>
            : null
        }
      </section>
    );
  }
}
