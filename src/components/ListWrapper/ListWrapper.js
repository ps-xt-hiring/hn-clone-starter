import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';
import './ListWrapper.css'

class ListWrapper extends Component {

  static propTypes = {
    news: PropTypes.array.isRequired,
    pageNo: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchNewsForFirstPage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.fetchMoreNews = this.fetchMoreNews.bind(
      this
    );
  }

  fetchMoreNews() {
    const { pageNo, isFetching, fetchNewsForFirstPage } = this.props;
    if (!isFetching) {
    fetchNewsForFirstPage(pageNo);
    }
  }

  render() {
    const { news } = this.props;
    return (
      <ul className="ListWrapper">
        {news.map(item => (
          <ListItem key={item.id} {...item} />
        ))}
        <button onClick={this.fetchMoreNews}> More </button>
      </ul>
    );
  }
}

export default ListWrapper;
