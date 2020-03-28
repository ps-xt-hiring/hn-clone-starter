/* eslint-disable class-methods-use-this */
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
      currentPage: 1,
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(baseQueryUrl);
    const hiddenItems = JSON.parse(localStorage.getItem('hiddenListArray'));
    this.updateHiddenList(hiddenItems, data);
    let newData = data.hits;
    newData.map(obj => (obj.upvote_count = 0));
    if (localStorage.getItem('upvoteList')) {
      newData = this.updateVoteList(newData);
    }
    this.setState({ newsList: newData });
  }

  async loadMore() {
    let { currentPage } = this.state;
    const { newsList } = this.state;
    currentPage += 1;
    this.setState({ currentPage });
    const { data } = await axios.get(`${baseQueryUrl}?query=page=${currentPage}`);
    let hits = data.hits.map(obj => (obj.upvote_count = 0));
    hits = this.updateVoteList(data.hits);
    this.updateHiddenList(JSON.parse(localStorage.getItem('hiddenListArray')), data);
    const updatedNewsList = [...newsList, ...hits];
    this.setState({ newsList: updatedNewsList });
  }

  updateVoteList(newData) {
    const updatedVotesArr = JSON.parse(localStorage.getItem('upvoteList'));
    for (let index = 0; index < updatedVotesArr.length; index += 1) {
      for (let secIndex = 0; secIndex < newData.length; secIndex += 1) {
        if (updatedVotesArr[index].id === newData[secIndex].objectID) {
          newData[secIndex].upvote_count = updatedVotesArr[index].count;
        }
      }
    }
    return newData;
  }

  updateHiddenList(hiddenItems, data) {
    if (hiddenItems) {
      const objIdsArr = [];
      for (let index = 0; index < hiddenItems.length; index += 1) {
        objIdsArr.push(hiddenItems[index].objectID);
      }
      for (let item = 0; item < objIdsArr.length; item += 1) {
        for (let secItem = 0; secItem < data.hits.length; secItem += 1) {
          if (data.hits[secItem].objectID === objIdsArr[item]) {
            data.hits.splice(secItem, 1);
          }
        }
      }
    }
    return data.hits;
  }

  vote(item) {
    const upvotedObjArr = !JSON.parse(localStorage.getItem('upvoteList')) ? [] : JSON.parse(localStorage.getItem('upvoteList'));
    const { newsList } = this.state;
    const newCountedArray = [...newsList];
    newCountedArray[item].upvote_count += 1;
    const upvotedObj = {
      id: newCountedArray[item].objectID,
      count: newCountedArray[item].upvote_count,
    };
    // push this object in array only if that doesnt exist
    for (let index = 0; index < upvotedObjArr.length; index += 1) {
      if (upvotedObjArr[index].id === upvotedObj.id) {
        upvotedObjArr.splice(index, 1);
      }
    }
    upvotedObjArr.push(upvotedObj);
    this.setState({ newsList: newCountedArray });
    localStorage.setItem('upvoteList', JSON.stringify(upvotedObjArr));
  }

  hide(index, item) {
    const { newsList } = this.state;
    const hiddenListArray = !localStorage.getItem('hiddenListArray') ? [] : JSON.parse(localStorage.getItem('hiddenListArray'));
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
        <div className="responsive-table">
          <div className="thead">
            <div className="row">
              <div className="head">top</div>
              <div className="head">New</div>
            </div>
          </div>
          <div>
            {
              newsList.map((item, i) => (
                <div key={item.objectID} className="item">
                  <div className="content">
                    {item.num_comments}
                  </div>
                  <div className="content">
                    {item.upvote_count}
                  </div>
                  <div role="button" tabIndex="0" className="content clickable" onClick={this.vote.bind(this, i)} onKeyDown={this.vote.bind(this, i)}>
                    <span className="carat"> ^ </span>
                  </div>
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
          </div>
        </div>
        <div className="btnContainer">
          <button type="button" onClick={this.loadMore.bind(this)}>More</button>
        </div>
      </div>
    );
  }
}

export default NewsListComponent;
