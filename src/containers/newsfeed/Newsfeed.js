import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// // Newsfeed.propTypes = {
// //   history: PropTypes.object.isRequired,
// // };

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
    const { history } = this.props;
    this.state = {
      newsType: history.location.pathName,
      hits: null,
      page: 0,
      btnHidden: true,
    };
  }

  componentDidMount() {
    this.getHackerNews(this.getPageNumber());
  }

  componentDidUpdate() {
    const pNo = this.getPageNumber();
    const { history } = this.props;
    const {
      newsType,
      page,
    } = this.state;
    if (history.location.pathname !== newsType
      || page !== pNo) {
      this.getHackerNews(pNo);
    }
  }

  getPageNumber() {
    const { history } = this.props;
    const pageNumber = history.location.search.split('=');
    return pageNumber[1] || 0;
  }

  getHackerNews = (pNo) => {
    const { history } = this.props;
    const currentPath = history.location.pathname;
    let newsType = FRONT_PAGE_NEWS;
    if (currentPath === LATEST_NEWS_ROUTE) { newsType = LATEST_NEWS; }
    Axios.get(newsType + PAGE_SEARCH_PARAM_REMOTE + pNo)
      .then((res) => {
        if (res.status === SUCCESS_STATUS) {
          this.parseNewsData(res.data, currentPath, pNo);
        }
      })
      .catch(() => {
        // console.log(err);
      });
  }

  parseNewsData = (data, currentPath, pNo) => {
    if (data.hits.length > 0) {
      let btnFlag = false;
      if (data.nbHits <= (data.hits.length + data.hitsPerPage * data.page)) {
        btnFlag = true;
      }
      this.setState({
        hits: data.hits,
        page: pNo,
        newsType: currentPath,
        btnHidden: btnFlag,
      });
    }
  }

  onMoreBtnClicked = () => {
    const { page } = this.state;
    const { history } = this.props;
    const pNo = page + 1;
    history.push({
      search: PAGE_SEARCH_PARAM + pNo,
    });
  }

  onClickUpVoteHandler = (objectID) => {
    const { hits } = this.state;
    const newState = [...hits];
    for (let item of newState) {
      if (item.objectID === objectID) {
        const matchedItem = item;
        matchedItem.points += 1;
        break;
      }
    }
    this.setState({
      hits: newState,
    });
  }

  onHideButtonHandler = (objectID) => {
    const { hits } = this.state;
    const newState = [...hits];
    let position = -1;
    for (let [item, index] of newState.entries()) {
      if (item.objectID === objectID) {
        position = index;
        break;
      }
    }
    newState.splice(position, 1);
    this.setState({
      hits: newState,
    });
  }

  render() {
    const { hits, btnHidden } = this.state;
    return (
      <Aux>
        <Newsitem
          newsItems={hits}
          onClickedUpvote={objectID => this.onClickUpVoteHandler(objectID)}
          onHideClicked={objectID => this.onHideButtonHandler(objectID)}
        />
        <Button
          clicked={this.onMoreBtnClicked}
          show={btnHidden}
        >
          {localeData[defaultLanguage].BUTTON_TEXT}
        </Button>
      </Aux>

    );
  }
}

export default Newsfeed;
