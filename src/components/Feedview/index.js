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
            hiddenFeeds: [],
            disableMore: false,
            isLoad: false,
            sortBy: "new"
        }

        this.upvotesArr = []

        this.upvote = this.upvote.bind(this)
        this.hideFeed = this.hideFeed.bind(this)
    }
    
    upvote(objectID) {
        let feeds = [...this.state.feeds]
        let feedObj = feeds.filter((f) => f.objectID === objectID)[0];
        if(this.upvotesArr.indexOf(objectID) >= 0) {
            feedObj.points = feedObj.points - 1
            this.upvotesArr.splice(this.upvotesArr.indexOf(objectID), 1)
        } else {
            feedObj.points = feedObj.points + 1
            this.upvotesArr.push(objectID)
        }
        this.setState({
            feeds: feeds
        })
        localStorage.setItem("upvotes", JSON.stringify(this.upvotesArr))
    }

    hideFeed(created_at_i) {
        let hiddenFeeds = [...this.state.hiddenFeeds]
        if(hiddenFeeds.indexOf(created_at_i) < 0) {
            hiddenFeeds.push(created_at_i)
        }
        localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds))
        this.setState({
            hiddenFeeds: hiddenFeeds
        })
        this.fetchData()
    }

    componentDidMount() {
        this.setState({
            isLoad: true,
            hiddenFeeds: JSON.parse(localStorage.getItem("hiddenFeeds") || "[]")
        })

        this.fetchData();    
    }

    fetchData() {
        let pageNum = this.getQueryStringValue("page") || 0;
        let sortBy = "new";
        let url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`;
        // if(window.location.pathname.indexOf('top') >= 0) {
        //     sortBy = "top";
        //     url = `https://hn.algolia.com/api/v1/search?tags=story&page=${pageNum}`
        // }

        fetch(url).then(res => res.json()).then((data) => {
            if(this.state.hiddenFeeds.length > 0) {
                const low = Math.min.apply(Math, this.state.hiddenFeeds)
                const url2 = `${url}&numericFilters=created_at_i<${low}`
                fetch(url2).then( r => r.json()).then( d => { 
                    const prevRes = data.hits.filter((f) => (this.state.hiddenFeeds.indexOf(f.created_at_i) < 0))
                    prevRes.push(...d.hits.slice(0, 20 - prevRes.length))
                    this.syncLocalStorage(prevRes, pageNum, sortBy)
                })
            } else {
                this.syncLocalStorage(data.hits, pageNum, sortBy)
            } 
        }).catch((err) => {
            console.log("API Error - ", err)
        })
    }

    syncLocalStorage(feeds, page, sortBy) {
        this.upvotesArr = JSON.parse(localStorage.getItem("upvotes") || "[]");

        let feedArr = []
        feeds.forEach((feed, idx) => {
            let feedObj = {...feed}
            feedObj.points = feed.points || 0
            if(this.upvotesArr.indexOf(feedObj.objectID) >= 0) {
                feedObj.points = feedObj.points + 1;
            }
            feedArr.push(feedObj)
        });

        this.setState({
            feeds: feedArr,
            isLoad: false,
            page: page,
            sortBy: sortBy 
        })
    }

    getQueryStringValue (key) {  
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }

    render() {
        return (
            <div className="feedsTable">
                {
                    this.state.isLoad ? 
                        <div className="loader">Loading...</div> : 
                        <table>
                            <thead>
                                <tr>
                                    <td className="header" colSpan="3">
                                        <img alt="logo" src={logo}></img>
                                        <span className="topNavLinks">
                                            <a href="/top">top</a>
                                            |
                                            <a href="/new">new</a>
                                        </span>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {   this.state.feeds.map((feed, idx) => {
                                        return (
                                            <tr key={`feed-${this.state.page}-${idx}`} className="feedContainer">
                                                <Feed feed={feed} upvote={this.upvote} hide={this.hideFeed} isUpvoted={this.upvotesArr.indexOf(feed.objectID) >= 0}></Feed>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr className="feedContainer">
                                    <td colSpan="3">
                                        {!this.state.disableMore && <a href={`?page=${parseInt(this.state.page)+1}`} className="moreButton">More</a>}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                }
            </div>
        )
    }
}

export default Feedview