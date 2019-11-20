import React, { Component } from 'react';
import { Col } from 'reactstrap';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import Feed from '../Feed/Feed';
import './Feeds.scss';



class Feeds extends Component {

  state = {
    feeds: [],
    feedUpvoteCount: 0,
    pageNum: 1,
    error: false
  };

  componentDidMount() {

    // this.setState({ loadingFeeds: true}, () => {
    trackPromise(
      axios.get(`search?query=foo&tags=story&page=${this.state.pageNum}`)
      .then( response => {
        let responseFeeds = response.data.hits;
        let lsFeeds = Object.keys(localStorage);

        if( lsFeeds.length !== 0 ) {
          //Search and update the responseFeeds for feeds(in ls) with increased upvotes
          for(let i = 0; i < lsFeeds.length; i++) {
            for(let j = 0; j < responseFeeds.length; j++) {
              if(lsFeeds[i] === responseFeeds[j].objectID) {
                responseFeeds[j].points = localStorage.getItem(lsFeeds[i]);
                break;
              }
            }
          }
        }
        this.setState({
          feeds: responseFeeds
        });
      })
      .catch(error => {
        this.setState({error: true});
      })
    )
    
  }


  componentDidUpdate(prevProps, prevState) {
    if(prevState.pageNum >= this.state.pageNum ) {
      return;
    }
    trackPromise(
      axios.get(`search?query=foo&tags=story&page=${this.state.pageNum}`)
      .then( response => {
        let responseFeeds = response.data.hits;
        let lsFeeds = Object.keys(localStorage);

        if( lsFeeds.length !== 0 ) {
          //Search and update the responseFeeds for feeds(in ls) with increased upvotes
          for(let i = 0; i < lsFeeds.length; i++) {
            for(let j = 0; j < responseFeeds.length; j++) {
              if(lsFeeds[i] === responseFeeds[j].objectID) {
                responseFeeds[j].points = localStorage.getItem(lsFeeds[i]);
                break;
              }
            }
          }
        }
        this.setState({
          feeds: responseFeeds
        });
      })
      .catch(error => {
        this.setState({error: true});
      })
    )

  }


  loadMoreFeeds = () => {
    this.setState({pageNum: this.state.pageNum + 1});
  }

  upvoteHandler = (upvotedFeed) => {
    const feeds = [...this.state.feeds];
    const upvotedFeedIndex = feeds.indexOf(upvotedFeed);
    feeds[upvotedFeedIndex] = {...upvotedFeed};
    feeds[upvotedFeedIndex].points++;
    this.setState({ feeds }); 

    //set in local storage : 
    localStorage.setItem(`${upvotedFeed.objectID}`, ++upvotedFeed.points);
  }

  hideHandler = (feedToHide) => {
    const feeds = this.state.feeds.filter(feed => feed.objectID !== feedToHide.objectID);
    this.setState({feeds});
  }

  render () {
    let feeds;
    const loading = this.state.loadingFeeds;

    if(this.state.error) {
      feeds = <h5 style={{textAlign:'center'}}>Oops! There was an error fetching your data!</h5>;
    }
    feeds = this.state.feeds.map((feed, index) => {
      return <Feed onUpvote={this.upvoteHandler}
                   onHide={this.hideHandler}
                   feed={feed} 
                   key={index} 
                   />
    });
    
    return (
      <>
        <div className="feeds">
          {feeds}
          <div className='loadMore'>
              <button className="button bold greyText" onClick={this.loadMoreFeeds}>More</button>
          </div>
        </div>
      </>
    );
  }
}



export default Feeds;