import React, { Component } from 'react';
import './news-list-item.css';
import Upvote from '../upvote/upvote';
import Text from '../text/text';
import { updateLocalStorage, formatDate, getDomainName } from '../../services/common';

export default class NewsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false
        };

        this.hideNewHandler = this.hideNewHandler.bind(this);
    }

    hideNewHandler() {
        updateLocalStorage('hiddenItemsList', this.props.item.objectID);

        this.setState({
            isHidden: true
        });
    }

    render() {
        let { item } = this.props;

        return (
            <>
                {!this.state.isHidden &&
                    <li className="News-list-item">
                        <div className="News-list-item-container">
                            <Text value={item.num_comments} type="New-comments" />
                            <Upvote item={item} />

                            <span className="New-details">
                                <Text value={item.title} type="New-title" />

                                {item.url &&
                                    <span className="New-link">
                                        ( <a href={item.url}>
                                            {getDomainName(item.url)}</a> )
                                    </span>
                                }

                                <Text value={`by ${item.author}`} type="New-user" />
                                <Text value={formatDate(item.created_at)} type="New-time" />

                                <span className="New-hide">
                                    [ <button onClick={this.hideNewHandler}>hide</button> ]
                                </span>
                            </span>
                        </div>
                    </li>}
            </>
        );
    }
}