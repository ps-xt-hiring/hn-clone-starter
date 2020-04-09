import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListWrapper from './ListWrapper/ListWrapper';
import './HackerNews.css';

class HackerNews extends Component {
  static defaultProps = {
    pageNo: 0,
  };

  static propTypes = {
    pageNo: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchNewsForFirstPage: PropTypes.func.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    const { pageNo, fetchNewsForFirstPage } = this.props;
    fetchNewsForFirstPage(pageNo);
  }

  render() {
    const { error, isFetching } = this.props;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isFetching) {
      return <div>Loading...</div>;
    }
    return (
      <div className="HackerNewsWrapper">
        <h1>Hacker News</h1>
        <ListWrapper {...this.props} />
      </div>
    );
  }
}

export default HackerNews;
