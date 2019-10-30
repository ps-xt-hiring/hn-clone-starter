import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '@material-ui/core/';
import queryString from 'query-string'
import { getNewsFeed, toggleVote } from '../actions/newsAction';
import Header from './header'
import NewsTable from './newsTable'

class NewsFeed extends React.Component {
	constructor(props) {
    super(props);
    this.queryString = queryString.parse(this.props.location.search)
    this.state = {
      newsList: [],
      currentPage: 1
    };
  }

  componentDidMount() {
    this._getNewsFeed();
    window.onpopstate = this._onBackButtonEvent
  }

  componentDidUpdate(prevProps) {
    const { newsList, currentPage, history } = this.props;
      if(newsList !== prevProps.newsList && newsList.length) {
      let newsListCopy = this._checkUpvotedFromLocalStorage(newsList)
      let currentPageFromLocalStorage = localStorage.getItem(currentPage);
    	if (currentPageFromLocalStorage) {
    		let currentPageArrayFromLocalStorage = JSON.parse(currentPageFromLocalStorage)
    		newsListCopy = newsListCopy.filter((item) => {
	    		if (currentPageArrayFromLocalStorage.indexOf(item.objectID) === -1) {
	    			return item
	    		} else {
	    			return false;
	    		}
	    	})
    	} 
      this.setState({
        newsList: newsListCopy, 
        currentPage
      }, () => {
      	if(prevProps.currentPage < currentPage) {
      		history.push(`/news?p=${currentPage}`)
      	}
      })
    }
  }

  _checkUpvotedFromLocalStorage(newsList) {
    let upVotedId = localStorage.getItem('upVotedId')
    if(upVotedId) {
      upVotedId = JSON.parse(upVotedId)
      return newsList.map((item) => {
        if(upVotedId.indexOf(item.objectID) !== -1) {
          item.isVoted = true
        }
        return item
      })
    } else {
      return newsList
    }
  }

  _onBackButtonEvent = (ev) => {
  	ev.preventDefault();
  	this.queryString = queryString.parse(this.props.location.search)
  	this._getNewsFeed();
  }

  _handlePagination = () => {
  	const { getNewsFeed } = this.props
  	const { currentPage } = this.state
  	getNewsFeed(currentPage+1)
  }

  _getNewsFeed = (type) => {
  	const { getNewsFeed } = this.props;
    let currentPage = Number(this.queryString.p)
    if(!isNaN(currentPage)) {
    	getNewsFeed(currentPage, type);
    } else {
    	getNewsFeed(1);
    }
  }

  _hideCurrentNews = (currentList) => {
  	const { currentPage, newsList } = this.state;
  	let currentPageFromLocalStorage = localStorage.getItem(currentPage);
  	if(currentPageFromLocalStorage) {
  		let hideListArrayFromLocalStorage = JSON.parse(currentPageFromLocalStorage)
  		hideListArrayFromLocalStorage.push(currentList.objectID)
  		localStorage.setItem([currentPage], JSON.stringify(hideListArrayFromLocalStorage));
  	} else {
  		let hideListArray = []
  		hideListArray.push(currentList.objectID)
  		localStorage.setItem([currentPage], JSON.stringify(hideListArray));
  	}
  	let newListCopy = newsList.filter((item) => {
  		if (item.objectID !== currentList.objectID)
  			return item
  		else 
  			return false;
  	})
  	this.setState({
  		newsList: newListCopy
  	})
  }

  _handleVote = (item) => {
    const { toggleVote } = this.props;
    toggleVote(item);
  }

  render() {
    const { newsList } = this.state
    return (
      <Container maxWidth="lg">
        <Header/>
        <NewsTable newsList={newsList} handlePagination={this._handlePagination} handleVote={(row) => this._handleVote(row)} hideCurrentNews={(row) => this._hideCurrentNews(row)}/>
      </Container>
    );
  }
}

export default withRouter(
  connect(
    ({ newsFeed }) => ({
      newsList: newsFeed.newsList,
      currentPage: newsFeed.currentPage
    }),
    dispatch => ({
      getNewsFeed: (currentPage) => dispatch(getNewsFeed(currentPage)),
      toggleVote: (item) => dispatch(toggleVote(item))
    }),
  )(NewsFeed)
);