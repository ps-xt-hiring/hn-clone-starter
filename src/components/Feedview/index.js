import React from 'react';
import Feed  from '../Feed';

import './feedview.css'
import logo from '../../y18.gif'

class Feedview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            feeds: [],
            page: 0,
            hiddenFeeds: []
        }

        this.upvote = this.upvote.bind(this)
        this.hideFeed = this.hideFeed.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }

    syncLocalStorage(feeds) {
        let upvotes = JSON.parse(localStorage.getItem("upvotes") || "{}");
        let feedArr = []
        feeds.forEach((feed, idx) => {
            let feedObj = {...feed}
            let key = `${this.state.page}-${idx}`
            feedObj.points = upvotes[key] || feed.points
            feedArr.push(feedObj)
        });
        
        let hiddenFeeds = JSON.parse(localStorage.getItem("hiddenFeeds") || "{}");
        this.setState({
            hiddenFeeds: hiddenFeeds,
            feeds: feedArr
        })
    }
    
    upvote(key) {
        let feedIndex = key.split("-")[1]
        let feeds = [...this.state.feeds]
        let points = feeds[feedIndex].points + 1
        feeds[feedIndex].points = points
        this.setState({
            feeds: feeds
        })
        let upvotes = JSON.parse(localStorage.getItem("upvotes") || "{}");
        upvotes[key] = points
        localStorage.setItem("upvotes", JSON.stringify(upvotes))
    }

    hideFeed(key) {
        let hiddenFeeds = {...this.state.hiddenFeeds}
        let pageNum = parseInt(key.split("-")[0])
        let feedNum = parseInt(key.split("-")[1])

        let hiddenArr = hiddenFeeds[pageNum] || []
        if(hiddenArr.indexOf(feedNum) < 0) {
            hiddenArr.push(feedNum)
        }
        hiddenFeeds[pageNum] = hiddenArr
        localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds))
        this.setState({
            hiddenFeeds: hiddenFeeds
        })
    }

    loadMore() {
        let page = this.state.page + 1;
        this.setState({
            page: page
        })
        this.fetchData(page);
    }

    componentDidMount() {
        this.fetchData(0)    
    }

    fetchData(pageNum) {
        fetch(`https://hn.algolia.com/api/v1/search?tags=story&page=${pageNum}`).then(res => res.json()).then((data) => {
            console.log("API - DATA - ", data)
            this.syncLocalStorage(data.hits)
        }).catch((err) => {
            console.log("Err ====== ", err)
        })
    }

    render() {
        return (
            <div className="feedsTable">
                <header>
                    <img src={logo}></img>
                    <span className="topNavLinks">
                        <a href="">top</a>
                        |
                        <a href="">new</a>
                    </span>
                </header>
                {
                    this.state.feeds.map((feed, idx) => {
                        if(this.state.hiddenFeeds[this.state.page] && this.state.hiddenFeeds[this.state.page].indexOf(idx) >= 0) {
                            return ""
                        } else {
                            return (
                                <Feed key={`feed-${this.state.page}-${idx}`} feed={feed} feedKey={`${this.state.page}-${idx}`} upvote={this.upvote} hide={this.hideFeed}></Feed>
                            )
                        }
                    })
                }
                <div className="feedsTableFooter">
                    <button onClick={this.loadMore}>More</button>
                </div>
            </div>
        )
    }
}

export default Feedview