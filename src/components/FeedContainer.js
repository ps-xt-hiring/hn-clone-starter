import React from 'react';
import FeedsAPI from '../api/FeedsAPI';
import Feed from './Feed';

export default class FeedContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      feeds: [],
      page: 0
    }
  }

  FeedApi = new FeedsAPI();

  addFeeds(page){
    const currentFeeds = this.state.feeds;
    this.FeedApi.getFeeds(page).then((data) => {
      this.setState({
        feeds: currentFeeds.concat(data),
        page: page
      });
    });
  }

  getFeeds() {
    if(this.state.feeds.length === 0) return <p>Loading Feeds..</p>
    return this.state.feeds.map((data, i) => <Feed key = {i} id = {data.objectID} title = {data.title} comments = {data.num_comments} upvotes = {data.points} link = {data.url} author = {data.author} time = {data.created_at_i} />);
  }

  getMoreFeeds(e) {
    e.preventDefault();
    this.addFeeds(this.state.page + 1);
  }

  componentDidMount() {
    this.addFeeds(0);
  }

  render() {
    return <>
      {this.getFeeds()}
      <div className = 'row mt-2'>
        <a href = '/' onClick = {this.getMoreFeeds.bind(this)} className = 'px-2 hn-more-link'>More</a>
      </div>
    </>
  }
}
