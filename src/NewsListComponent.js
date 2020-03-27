/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { Component } from 'react';
import axios from 'axios';
import './NewsListComponent.css';

const baseQueryUrl = 'https://hn.algolia.com/api/v1/search';

class NewsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      hiddenListArray: [],
      currentPage: 1,
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(baseQueryUrl);
    const hiddenItems = JSON.parse(localStorage.getItem('hiddenListArray'));
    if (hiddenItems) {
      const objIdsArr = [];
      for (let i = 0; i < hiddenItems.length; i += 1) {
        objIdsArr.push(hiddenItems[i].objectID);
      }
      for (let a = 0; a < objIdsArr.length; a += 1) {
        for (let b = 0; b < data.hits.length; b += 1) {
          if (data.hits[b].objectID === objIdsArr[a]) {
            data.hits.splice(b, 1);
          }
        }
      }
    }
    const newData = data.hits;
    newData.map(o => (o.upvote_count = 0));
    this.setState({ newsList: newData });
  }

  async loadMore() {
    let { currentPage } = this.state;
    const { newsList } = this.state;
    currentPage += 1;
    this.setState({ currentPage });
    const { data } = await axios.get(`${baseQueryUrl}?query=page=${currentPage}`);
    const updatedNewsList = [...newsList, ...data.hits];
    this.setState({ newsList: updatedNewsList });
  }

  vote(i) {
    const { newsList } = this.state;
    const newCountedArray = [...newsList];
    newCountedArray[i].upvote_count += 1;
    this.setState({ newsList: newCountedArray });
  }

  hide(index, item) {
    const { hiddenListArray, newsList } = this.state;
    const newHiddenRowList = [...newsList];
    hiddenListArray.push(item);
    newHiddenRowList.splice(index, 1);
    localStorage.setItem('hiddenListArray', JSON.stringify(hiddenListArray));
    this.setState({ newsList: newHiddenRowList });
  }

  render() {
    const { newsList } = this.state;
    return (
      <div className="NewsList">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>top</th>
              <th>New</th>
            </tr>
          </thead>
          <tbody>
            {
              newsList.map((item, i) => (
                <div key={item.objectID} className="item">
                  <div className="content">
                    {item.num_comments}
                  </div>
                  <div className="content">
                    {item.upvote_count}
                  </div>
                  <div role="button" tabIndex="0" className="content clickable" onClick={this.vote.bind(this, i)} onKeyDown={this.vote.bind(this, i)}>^</div>
                  <a className="content" href={item.url}>
                    {item.title}
                  </a>
                  <a className="content" href={item.url}>
                    {item.url}
                  </a>
                  <div className="content">
                    {item.author}
                  </div>
                  <div className="content">
                    {(((new Date().getTime() - new Date(item.created_at)) / (1000 * 60 * 60))).toFixed(0)}
                    {' '}
                    hours ago
                  </div>
                  <div role="button" tabIndex="0" className="content clickable" onClick={this.hide.bind(this, i, item)} onKeyDown={this.vote.bind(this, i)}> [ Hide ] </div>
                </div>
              ))
            }
          </tbody>
        </table>
        <div className="btnContainer">
          <button type="button" onClick={this.loadMore.bind(this)}>More</button>
        </div>
      </div>
    );
  }
}

export default NewsListComponent;
