import React from 'react';
import { PropTypes } from 'prop-types';
import Post from './Post';
import DataEngineLayer from './DataEngineLayer';
import Constants from '../constants';

export default class StoryList extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      data: null,
    };
    this.renderPosts = this.renderPosts.bind(this);
    this.hidePost = this.hidePost.bind(this);
    this.upvotePost = this.upvotePost.bind(this);
    this.downvotePost = this.downvotePost.bind(this);
    this.loadInitialData = this.loadLatestStories.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.updateData = this.updateData.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    this.loadTopStories();
  }

  componentDidUpdate(nextProps) {
    const { view } = this.props;
    if (nextProps.view !== view) {
      switch (view) {
        case 'top': this.loadTopStories(); break;
        case 'new': this.loadLatestStories(); break;
        default: break;
      }
    }
  }

  scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }

  updateData(data) {
    this.setState({
      data,
    });

    this.scrollToTop();
  }

  loadLatestStories() {
    DataEngineLayer.loadLatest().then(this.updateData);
  }

  loadTopStories() {
    DataEngineLayer.loadTop().then(this.updateData);
  }


  loadNextPage() {
    DataEngineLayer.loadNext().then(this.updateData);
  }

  hidePost(idToHide) {
    const { data } = this.state;
    const story = data.filter(stry => stry.id === idToHide)[0];
    story.hidden = true;
    this.setState({ data });

    DataEngineLayer.hideStory(idToHide);
  }

  upvotePost(idtoUpvote) {
    const { data } = this.state;
    const story = data.filter(stry => stry.id === idtoUpvote)[0];
    story.upvoted = true;
    story.proxyPoints += 1;
    this.setState({ data });

    DataEngineLayer.upvoteStory(idtoUpvote);
  }

  downvotePost(idtoDownvote) {
    const { data } = this.state;
    const story = data.filter(stry => stry.id === idtoDownvote)[0];
    story.upvoted = false;
    story.proxyPoints -= 1;
    this.setState({ data });
  }

  renderPosts() {
    const { data } = this.state;
    const self = this;

    const visibleRecords = data.filter(record => !record.hidden);
    return visibleRecords.map(record => (
      <Post
        key={record.id}
        {...record}
        onHide={self.hidePost}
        onUpvote={self.upvotePost}
        onDownvote={self.downvotePost}
      />
    ));
  }

  render() {
    const { data } = this.state;
    const { Text: { more } } = Constants;
    return (
      <div>
        {data
            && (
            <table border="0">
              <thead>
                <tr>
                  <th width="5%" />
                  <th width="95%" />
                </tr>
              </thead>
              <tbody>
                {this.renderPosts()}
              </tbody>
              <tfoot />
            </table>
            )}
        <div onClick={this.loadNextPage} className="load-more-container" aria-hidden>
          <span>{more}</span>
        </div>
      </div>);
  }
}

StoryList.propTypes = {
  view: PropTypes.string,
};

StoryList.defaultProps = {
  view: '',
};
