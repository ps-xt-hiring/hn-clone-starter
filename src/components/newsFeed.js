import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '@material-ui/core/';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { getNewsFeedAction, toggleVoteAction } from '../Actions/newsAction';
import Header from './header';
import NewsTable from './newsTable';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.queryString = queryString.parse(location.search);
    this.state = {
      newsList: [],
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.getNewsFeedCall();
    window.onpopstate = this.onBackButtonEvent;
  }

  componentDidUpdate(prevProps) {
    const { newsList, currentPage } = this.props;
    if (newsList !== prevProps.newsList && newsList.length) {
      let newsListCopy = this.checkUpvotedFromLocalStorage(newsList);
      const currentPageFromLocalStorage = localStorage.getItem(currentPage);
      if (currentPageFromLocalStorage) {
        const currentPageArrayFromLocalStorage = JSON.parse(
          currentPageFromLocalStorage,
        );
        newsListCopy = newsListCopy.filter((item) => {
          if (currentPageArrayFromLocalStorage.indexOf(item.objectID) === -1) {
            return item;
          }
          return false;
        });
      }
      this.updateNewsListState(
        prevProps.currentPage,
        currentPage,
        newsListCopy,
      );
    }
  }

  updateNewsListState = (prevCurrentPage, currentPage, newsListCopy) => {
    const { history } = this.props;
    this.setState(
      {
        newsList: newsListCopy,
        currentPage,
      },
      () => {
        if (prevCurrentPage < currentPage) {
          history.push(`/news?p=${currentPage}`);
        }
      },
    );
  };

  handleVote = (selectedRow) => {
    const { toggleVote, newsList } = this.props;
    let upVotedIdArray = [];
    const upVotedId = localStorage.getItem('upVotedId');
    if (upVotedId) {
      upVotedIdArray = JSON.parse(upVotedId);
    }
    const newsListCopy = newsList.map((item) => {
      if (item.objectID === selectedRow.objectID) {
        if (item.isVoted) {
          upVotedIdArray.splice(upVotedIdArray.indexOf(item.objectID), 1);
          delete item.isVoted;
        } else {
          upVotedIdArray.push(selectedRow.objectID);
          item.isVoted = true;
        }
      }
      return item;
    });

    localStorage.setItem('upVotedId', JSON.stringify(upVotedIdArray));
    toggleVote(newsListCopy);
  };

  hideCurrentNews = (currentList) => {
    const { currentPage, newsList } = this.state;
    const currentPageFromLocalStorage = localStorage.getItem(currentPage);
    if (currentPageFromLocalStorage) {
      const hideListArrayFromLocalStorage = JSON.parse(
        currentPageFromLocalStorage,
      );
      hideListArrayFromLocalStorage.push(currentList.objectID);
      localStorage.setItem(
        [currentPage],
        JSON.stringify(hideListArrayFromLocalStorage),
      );
    } else {
      const hideListArray = [];
      hideListArray.push(currentList.objectID);
      localStorage.setItem([currentPage], JSON.stringify(hideListArray));
    }
    const newListCopy = newsList.filter((item) => {
      if (item.objectID !== currentList.objectID) {
        return item;
      }
      return false;
    });
    this.setState({
      newsList: newListCopy,
    });
  };

  getNewsFeedCall = (type) => {
    const { getNewsFeed } = this.props;
    const currentPage = Number(this.queryString.p);
    if (!Number.isNaN(currentPage)) {
      getNewsFeed(currentPage, type);
    } else {
      getNewsFeed(1);
    }
  };

  handlePagination = () => {
    const { getNewsFeed } = this.props;
    const { currentPage } = this.state;
    getNewsFeed(currentPage + 1);
  };

  onBackButtonEvent = (ev) => {
    const { location } = this.props;
    ev.preventDefault();
    this.queryString = queryString.parse(location.search);
    this.getNewsFeedCall();
  };

  /* eslint no-param-reassign: ["error", { "props": false }] */

  checkUpvotedFromLocalStorage = (newsList) => {
    let upVotedId = localStorage.getItem('upVotedId');
    if (upVotedId) {
      upVotedId = JSON.parse(upVotedId);
      return newsList.map((item) => {
        if (upVotedId.indexOf(item.objectID) !== -1) {
          item.isVoted = true;
        }
        return item;
      });
    }
    return newsList;
  };

  render() {
    const { newsList } = this.state;
    return (
      <Container maxWidth="lg">
        <Header />
        <NewsTable
          newsList={newsList}
          handlePagination={this.handlePagination}
          handleVote={row => this.handleVote(row)}
          hideCurrentNews={row => this.hideCurrentNews(row)}
        />
      </Container>
    );
  }
}

NewsFeed.defaultProps = {
  newsList: [],
};

NewsFeed.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  getNewsFeed: PropTypes.func.isRequired,
  toggleVote: PropTypes.func.isRequired,
  newsList: PropTypes.arrayOf(
    PropTypes.shape({
      num_comments: PropTypes.number,
      points: PropTypes.number,
      isVoted: PropTypes.boolean,
      title: PropTypes.string,
      url: PropTypes.string,
      author: PropTypes.string,
      created_at: PropTypes.string,
    }),
  ),
};

export default withRouter(
  connect(
    ({ newsFeed }) => ({
      newsList: newsFeed.newsList,
      currentPage: newsFeed.currentPage,
    }),
    dispatch => ({
      getNewsFeed: currentPage => dispatch(getNewsFeedAction(currentPage)),
      toggleVote: item => dispatch(toggleVoteAction(item)),
    }),
  )(NewsFeed),
);
