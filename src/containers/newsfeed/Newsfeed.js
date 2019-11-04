import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Newsitem from '../../components/newsitem/NewsItem';
import Axios from '../../utils/axios/Axios-Config';
import { FRONT_PAGE_NEWS, LATEST_NEWS } from '../../utils/ServiceURL';
import {
  LATEST_NEWS_ROUTE,
  SUCCESS_STATUS,
  PAGE_SEARCH_PARAM,
  PAGE_SEARCH_PARAM_REMOTE,
} from '../../utils/Constants';
import Aux from '../../hoc/Auxillary';
import Button from '../../components/UI/Button/Button';
import { localeData, defaultLanguage } from '../../utils/Locale-Data';

class Newsfeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsType: this.props.history.location.pathname,
      hits: null,
      page: 0,
      btnHidden: true,
    }
  };

  componentDidMount() {
    this.getHackerNews(this.getPageNumber());
  }

  componentDidUpdate() {
    const pNo = this.getPageNumber(),
      route = this.props.history;
    if (route.location.pathname !== this.state.newsType
      || this.state.page !== pNo) {
      this.getHackerNews(pNo);
    }
  }

  getPageNumber() {
    const route = this.props.history,
      pageNumber = route.location.search.split('=');
    return pageNumber[1] || 0;
  }

  getHackerNews = (pNo) => {
    const route = this.props.history;
    let newsType = FRONT_PAGE_NEWS,
      currentPath = route.location.pathname;
    if (currentPath === LATEST_NEWS_ROUTE) { newsType = LATEST_NEWS; }
    Axios.get(newsType + PAGE_SEARCH_PARAM_REMOTE + pNo)
      .then((res) => {
        if (res.status === SUCCESS_STATUS) {
          this.parseNewsData(res.data, currentPath, pNo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  parseNewsData = (data, currentPath, pNo) => {
    if (data.hits.length > 0) {
      let btnHidden = false;
      if (data.nbHits <= (data.hits.length + data.hitsPerPage * data.page)) {
        btnHidden = true;
      }
      this.setState({
        hits: data.hits,
        totalPages: data.nbPages,
        totalCount: data.nbHits,
        page: pNo,
        newsType: currentPath,
        btnHidden: btnHidden,
      })
    }
  }

  onMoreBtnClicked = () => {
    let pNo = this.state.page + 1;
    this.props.history.push({
      search: PAGE_SEARCH_PARAM + pNo
    });
  }

  onClickUpVoteHandler = (objectID) => {
    const newState = [...this.state.hits];
    newState.forEach(function (item) {
      if (item.objectID === objectID) {
        item.points += 1;
        return;
      }
    });
    this.setState({
      hits: newState
    });
  }

  onHideButtonHandler = (objectID) => {
    const newState = [...this.state.hits];
    let position = -1;
    newState.forEach(function (item, index) {
      if (item.objectID === objectID) {
        position = index;
        return;
      }
    });
    newState.splice(position, 1);
    this.setState({
      hits: newState
    });
  }

  render() {
    return (
      <Aux>
        <Newsitem
          newsItems={this.state.hits}
          onClickedUpvote={(objectID) => this.onClickUpVoteHandler(objectID)}
          onHideClicked={(objectID) => this.onHideButtonHandler(objectID)}
        />
        <Button
          clicked={this.onMoreBtnClicked}
          show={this.state.btnHidden}
        >
          {localeData[defaultLanguage].BUTTON_TEXT}
        </Button>
      </Aux>

    );
  }
}

Newsfeed.propTypes = {
  history: PropTypes.object.isRequired
};

export default Newsfeed;
