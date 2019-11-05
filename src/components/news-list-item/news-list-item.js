import React, { Component } from 'react';
import './news-list-item.css';
import PropTypes from 'prop-types';
import Upvote from '../upvote/upvote';
import Text from '../text/text';
import { updateLocalStorage, formatDate, getDomainName } from '../../services/common';

export default class NewsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };

    this.hideNewHandler = this.hideNewHandler.bind(this);
  }

  hideNewHandler() {
    const { item } = this.props;

    updateLocalStorage('hiddenItemsList', item.objectID);
    this.setState({
      isHidden: true,
    });
  }

  render() {
    const { item } = this.props;
    const { isHidden } = this.state;
    return (
      <>
        {
          !isHidden
          && (<li className="News-list-item">
            <div className="News-list-item-container">
              <Text value={item.num_comments} type="New-comments" />
              <Upvote item={item} />
              <span className="New-details">
                <Text value={item.title} type="New-title" />
                {
                item.url
                && (
                  <span className="New-link">
                  (
                  <a href={item.url}>{getDomainName(item.url)}</a>
                  )
                  </span>
                  )
                }
                <Text value={`by ${item.author}`} type="New-user" />
                <Text value={formatDate(item.created_at)} type="New-time" />
                <span className="New-hide">
                  [
                  <button type="button" onClick={this.hideNewHandler}>hide</button>
                  ]
                </span>
              </span>
            </div>
          </li>)
        }
      </>
    );
  }
}

NewsListItem.propTypes = {
  item: PropTypes.shape({
    num_comments: PropTypes.number,
    points: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

NewsListItem.defaultProps = {
  item: {
    num_comments: 0,
    points: 0,
    title: '',
    url: '',
    author: '',
    created_at: '',
  },
};