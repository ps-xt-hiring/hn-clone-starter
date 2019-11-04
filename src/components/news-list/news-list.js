import React, { Component } from 'react';
import './news-list.css';
import NewsListItem from '../news-list-item/news-list-item';
const apiUrl = "https://hn.algolia.com/api/v1/search_by_date?tags=front_page&page=";

export default class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsListItems: [],
            error: null,
            isLoaded: false,
            pageNumber: 0,
            totalPages: 0
        };

        this.loadmore = this.loadmore.bind(this);
    }

    componentDidMount() {
        this.fetchNewsList(apiUrl + this.state.pageNumber);
    }

    fetchNewsList(apiUrl) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(response => {
                this.resultsHandler(response);
            },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    resultsHandler(response) {
        let upvotedItemsList = JSON.parse(localStorage.getItem('upvotedItemsList'));

        let items = response.hits.map(item => {
            if (upvotedItemsList && upvotedItemsList.lastIndexOf(item.objectID) > -1) {
                item.isUpvoted = true;
                item.points += 1;
            }
            return item;
        });

        this.setState({
            isLoaded: true,
            newsListItems: items,
            totalPages: response.nbPages
        });
    }

    renderNewsList() {
        let { newsListItems } = this.state,
            itemsNew,
            hiddenItemList = JSON.parse(localStorage.getItem('hiddenItemsList'));

        // Filter list with hidden items
        if (hiddenItemList) {
            newsListItems = newsListItems.filter(item => hiddenItemList.lastIndexOf(item.objectID) === -1);
        }

        itemsNew = newsListItems.map(item => {
            return <NewsListItem key={item.objectID} item={item} />
        });

        return itemsNew;
    }

    loadmore() {
        this.fetchNewsList(apiUrl + (this.state.pageNumber + 1));

        this.setState({
            pageNumber: this.state.pageNumber + 1
        });
    }

    renderLoadmore() {
        if (this.state.pageNumber < this.state.totalPages - 1) {
            return <button className="loadmore" onClick={this.loadmore}>more</button>
        }
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    <ul className="New-list">
                        {this.renderNewsList()}
                    </ul>
                    {this.renderLoadmore()}
                </>
            )
        }
    }
}