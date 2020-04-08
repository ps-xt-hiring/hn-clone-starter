import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListWrapper from './ListWrapper/ListWrapper'
import './HackerNews.css';

class HackerNews extends Component {
  static defaultProps = {
    news: [],
    pageNo: 0,
  };

  static propTypes = {
    news: PropTypes.array.isRequired,
    pageNo: PropTypes.number.isRequired,
    newsIds: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchNewsForFirstPage: PropTypes.func.isRequired,
    updateVotesAction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { pageNo } = this.props;
    this.props.fetchNewsForFirstPage(pageNo);
  }

 render() {
    const { error, isFetching, news,pageNo, fetchNewsForFirstPage, updateVotesAction } = this.props;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isFetching) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="HackerNewsWrapper">
        <h1>Hacker News</h1>
        <ListWrapper {...this.props}/>
        </div>
      );
    }
  }
}

export default HackerNews;
