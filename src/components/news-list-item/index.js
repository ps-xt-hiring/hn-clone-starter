import React, { Component } from 'react';
import './news-list-item.scss';
import PropTypes from 'prop-types';
import Upvote from '../upvote';
import Text from '../text';
import { formatDate, getDomainName } from '../../services/common';

export default class NewsListItem extends Component {
  render() {
    const { item, upvoteHandler, hideNewHandler } = this.props;

    return (
      <>
        {
          (
          !item.isHidden
          && (
            <li className="news-list__item">
              <div className="news-list__item-container">
                <Text value={item.num_comments} type="new__comments" />
                <Upvote item={item} upvoteHandler={upvoteHandler} />
                <div className="new__details">
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
                    <button type="button" onClick={() => hideNewHandler(item.objectID)}>hide</button>
                    ]
                  </span>
                </div>
              </div>
            </li>
          )
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
  upvoteHandler: PropTypes.func,
  hideNewHandler: PropTypes.func,
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
  upvoteHandler: () => {},
  hideNewHandler: () => {},
};
