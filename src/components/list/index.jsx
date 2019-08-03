import React, { Component } from 'react';

import { filterListItems, upvote } from '../../utility/modifyFeed'
import { setStorage } from '../../utility/storage'

import ListItem from '../list-item'

import './style.scss';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = { feedData: filterListItems(this.props.feedData) };
    }

    onHideItem = (objectID = "") => {
        setStorage({ storageKey: "hidePost", objectID, value: true });
        this.setState((currentState) => {
            return { feedData: filterListItems(currentState.feedData) }
        });
    }

    onUpvote = (objectID = "", points = 0) => {
        this.setState((currentState) => {
            return { feedData: upvote(objectID, points, currentState.feedData) }
        })
    }

    render() {
        return (
            <main className="list-container">
                {this.state.feedData.map((feedItem, index) => <ListItem key={index} data={feedItem} upvoteHandler={this.onUpvote} hideItemHandler={this.onHideItem} />)}
            </main>
        );
    }
}

export default List;
