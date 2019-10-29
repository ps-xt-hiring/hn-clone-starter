import React from 'react';
import axios from 'axios';
import FeedItem from './item/FeedItem';
import Storage from '../../utils/storage';
import Loading from '../loading/Loading';
import Config from '../../utils/config';

const API_BASE = 'http://hn.algolia.com/api/v1/';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

let page = 0;
let hideItems = [];
let downvoteItems = [];

//for local storage checks
const SET_ENV = Config.SET_ENV;

class Feed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            feed: [],
            page: 0,
            loading: true
        }
    }

    /**
     * Fetching feed
     * @param {*} url 
     */
    getFeed(url) {
        axios.get(url, {
                cancelToken: source.token
            })
            .then(res => {
                if (res.status === 200) {
                    const data = res.data;
                    const hits = data.hits;
                    const feedLength = hits.length;
                    let feed = [];

                    // checking with local store
                    if (SET_ENV === "local") {
                        for (let index = 0; index < feedLength; index++) {
                            let item = hits[index];
                            const indexOfDownVote = downvoteItems.indexOf(item.objectID);
                            if (indexOfDownVote > -1) {
                                item.downvote = true;
                                item.points += 1;
                            }
                            const indexof = hideItems.indexOf(item.objectID);
                            if (indexof === -1) {
                                feed.push(item);
                            }
                        }
                    } else {
                        feed = [...hits];
                    }

                    page = data.page;
                    this.setState({ feed, page, loading: false });
                } else {
                    this.setState({ feed: [], loading: false });
                }
            })
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            });
    }

    /**
     * Setting varibles with local store values and fetching feed on mounting phase
     */
    componentDidMount() {
        const obj = Storage.loadState();
        if (obj) {
            if (obj.hideItems) {
                hideItems = obj.hideItems;
            }
            if (obj.downvoteItems) {
                downvoteItems = obj.downvoteItems;
            }
        }

        const url = API_BASE + 'search_by_date?tags=front_page'
        this.getFeed(url);
    }

    /**
     * Loadmore functionality
     */
    loadMore = () => {
        let { page } = this.state;
        page++;
        const url = API_BASE + 'search_by_date?page=' + page;
        this.setState({
            loading: true
        });
        this.getFeed(url);
    }

    /**
     * Hiding an item
     * @param {*} item
     */
    hideItem = item => {
        let { feed } = this.state;
        const feedLength = feed.length;

        if (feedLength > 0) {
            for (let index = 0; index < feedLength; index++) {
                const feedItem = feed[index];

                if (feedItem.objectID === item.objectID) {
                    feed.splice(index, 1);

                    break;
                }
            }
        }

        // storing to local store
        if (SET_ENV === "local") {
            hideItems.push(item.objectID);
            this.saveToLocal();
        } else {
            //TODO CALL API
        }

        this.setState({ feed, page, loading: false });
    }

    /**
     * Downvote an item
     * @param {*} item
     */
    downvoteItem = item => {
        // storing to local store
        if (SET_ENV === "local") {
            const indexOfDownVote = downvoteItems.indexOf(item.objectID);
            if (indexOfDownVote === -1) {
                downvoteItems.push(item.objectID);
            } else {
                downvoteItems.splice(indexOfDownVote, 1);
            }
            this.saveToLocal();
        } else {
            //TODO CALL API
        }
    }

    /**
     * Updating the local store with latest changes
     */
    saveToLocal = () => {
        Storage.saveState({
            hideItems,
            downvoteItems
        });
    }

    /**
     * Canceling the HTTP requests on unmount phase
     */
    componentWillUnmount() {
        source.cancel('Operation canceled by the user.');
    }

    render() {
        const { feed, loading } = this.state;

        return (
            <div className="feed-list">
                {
                    loading ? 
                        <Loading />
                        :
                        feed.length > 0 ?
                            <>
                                {
                                    feed.map(item => 
                                        <FeedItem data={item} key={item.objectID} hideItem={this.hideItem} downvoteItem={this.downvoteItem}/>
                                    )
                                }
                                <button className="more-button" onClick={this.loadMore}>More</button>
                            </>
                            : <Loading message="No Content"/>
                }
            </div>
        );
    }

}

export default Feed;