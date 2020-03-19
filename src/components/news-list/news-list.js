import React from 'react';

import axios from 'axios';
import NewsItem from '../news-item/news-item';

export default class NewsList extends React.Component {
  state = {
    pageNo: 1,
    newsList: [],
    loading: false,
    loadMore: false,
  }

  componentDidMount() {
    this.getNewsListData();
  }

  getNewsListData() {
    axios.get(`http://hn.algolia.com/api/v1/search_by_date?page=${this.state.pageNo}&numericFilters=num_comments>10,points>10`)
      .then(res => {
        let result = res.data.hits;
        let hideNewsList = localStorage.getItem('hideNewsList');
        if (hideNewsList) {
          hideNewsList = JSON.parse(hideNewsList);
          result = result.filter((val, key) => {
            return hideNewsList.indexOf(val.objectID) === -1
          });
        }
        const lastNewsList = [...this.state.newsList];

        const newsList = lastNewsList.concat(result);
        this.setState({
          newsList,
          loading: true,
          loadMore: false,
        });
      });
  }

  loadMore() {
    this.setState({
      pageNo: this.state.pageNo + 1,
      loadMore: true
    });
    this.getNewsListData();
  }

  hideItem(data) {
    let objectId = data.data.objectID;
    let hideNewsList = localStorage.getItem('hideNewsList');
    if (hideNewsList) {
      hideNewsList = JSON.parse(hideNewsList);
    } else {
      hideNewsList = [];
    }
    hideNewsList.push(objectId)
    localStorage.setItem('hideNewsList', JSON.stringify(hideNewsList));
    let newsList = [...this.state.newsList];
    newsList = newsList.filter((val, key) => {
      return val.objectID !== objectId
    });
    this.setState({
      newsList
    })
  }

  render() {
    return (
      <section className="news-list-wrapper">
        <ul className="news-list">
          {this.state.newsList.map((val, key) => {
            return (
              <NewsItem key={val.created_at_i} hideItem={($event) => this.hideItem($event)} data={val} />
            )
          })}
        </ul>
        {
          this.state.loading ? (
            this.state.loadMore ?
              <div className="load-more-btn">Loading..</div>
              :
              <div className="load-more-btn" onClick={() => this.loadMore()}>More</div>
          ) : null
        }
      </section>
    )
  }
}