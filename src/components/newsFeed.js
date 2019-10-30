import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as moment from 'moment';
import { getNewsFeed } from '../actions/newsAction';
import { Container, Grid, Link, Table, TableBody, TableCell, TableRow } from '@material-ui/core/';
import queryString from 'query-string'

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
    debugger
    if(newsList !== prevProps.newsList && newsList.length) {
    	let newsListCopy = []
    	let currentPageFromLocalStorage = localStorage.getItem(currentPage);
    	if (currentPageFromLocalStorage) {
    		let currentPageArrayFromLocalStorage = JSON.parse(currentPageFromLocalStorage)
    		newsListCopy = newsList.filter((item) => {
	    		if (currentPageArrayFromLocalStorage.indexOf(item.objectID) === -1) {
	    			return item
	    		} else {
	    			return false;
	    		}
	    	})
    	} else {
    		newsListCopy = newsList
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

  _onBackButtonEvent = (ev) => {
  	ev.preventDefault();
  	this.queryString = queryString.parse(this.props.location.search)
  	this._getNewsFeed();
  }

  _getDomain = (url) => {
    if(url) {
      const urlName = new URL(url);
      return  urlName.host 
    } else {
      return "Unknown"
    }
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

  render() {
    const { newsList } = this.state
    return (
     <Container maxWidth="lg">
        <Grid container xs={12} item className='header' direction="row" alignItems="center">
          <Grid item className='headerChild'>
            <Link href="/">
              <img className='logo' src="https://news.ycombinator.com/y18.gif"  alt="logo"/> 
            </Link>
          </Grid>
          <Grid item className='headerChild'>
            <b className="white">Top</b>
          </Grid>
          <Grid item className='headerChild'>
            |
          </Grid>
          <Grid item className='headerChild'>
            <b>New</b>
          </Grid>
        </Grid>
        <Table aria-label="news list table" className="newsList">
        <caption onClick={this._handlePagination}>More</caption>
        <TableBody>
          <TableRow className="emptyTableRow"></TableRow>
          {newsList.map(row => (
            <TableRow key={row.objectID}>
              <TableCell size='small' align="center"><b>{row.num_comments ? row.num_comments : 0}</b></TableCell>
              <TableCell size='small' className='noPadding' width={1}><b>{row.points}</b></TableCell>
              <TableCell size='small' className='noPadding' width={1}><i className="material-icons grey">arrow_drop_up</i></TableCell>
              <TableCell size='small' className='noPadding'>
                <Link href={row.url ? row.url : '/' } className="title">{row.title ? row.title+" " : 'No Title Available '}</Link>
                <Link href="/" className="grey fs10px">({this._getDomain(row.url)})</Link>
                <span className="grey fs10px"> by</span>
                <b className="fs10px"> {row.author} </b>
                <span className="grey fs10px">{moment(row.created_at).fromNow()}</span>
                <span className="fs10px"> [ <b onClick={() => this._hideCurrentNews(row)}>hide</b> ]</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    }),
  )(NewsFeed)
);