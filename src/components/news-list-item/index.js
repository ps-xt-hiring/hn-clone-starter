import React, { Component } from 'react';
import './news-list-item.scss';
import PropTypes from 'prop-types';
import Upvote from '../upvote';
import Text from '../text';
import { updateLocalStorage, formatDate, getDomainName } from '../../services/common';

export default class NewsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };

    this.hideNewHandler = this.hideNewHandler.bind(this);
  }

  // Function name: hideNewHandler
  // Arguments: none
  // It triggers on hide button click which hides the current item and update the local storage
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
          && (
          <li className="news-list__item">
            <div className="news-list__item-container">
              <Text value={item.num_comments} type="new__comments" />
              <Upvote item={item} />
              <span className="new__details">
                <Text value={item.title} type="new__title" />
                {
                item.url
                && (
                <span className="new__link">
                  (
                  <a href={item.url}>{getDomainName(item.url)}</a>
                  )
                </span>
                )
                }
                <Text value={`by ${item.author}`} type="new__author" />
                <Text value={formatDate(item.created_at)} type="new__time" />
                <span className="new__hide">
                  [
                  <button type="button" onClick={this.hideNewHandler}>hide</button>
                  ]
                </span>
              </span>
            </div>
          </li>
          )
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
