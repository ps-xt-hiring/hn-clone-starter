import React, { PureComponent } from 'react';
import { NewsFeed as NewsFeedComponent } from './NewsFeed.component';

class NewsFeed extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      feeds: []
    };
  }

  componentDidMount() {
    const localSavedFeeds = this.getFeedsFromLocal(this.props.pageNo);

    if (localSavedFeeds) {
      this.setState({ feeds: localSavedFeeds });
    } else {
      this.getData();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageNo !== this.props.pageNo) {
      const localSavedFeeds = this.getFeedsFromLocal(this.props.pageNo);

      if (localSavedFeeds) {
        this.setState({ feeds: localSavedFeeds });
      } else {
        this.getData();
      }
    }
  }

  getData() {
    fetch(`http://hn.algolia.com/api/v1/search?tags=story&page=${this.props.pageNo}`)
      .then(response => response.json())
      .then(result => {
        const feeds = result.hits.map(r => ({ ...r, isHidden: false }));

        this.setState({ feeds });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  convertTime(time) {
    const templates = {
      prefix: '',
      suffix: ' ago',
      seconds: 'less than a minute',
      minute: 'about a minute',
      minutes: '%d minutes',
      hour: 'about an hour',
      hours: 'about %d hours',
      day: 'a day',
      days: '%d days',
      month: 'about a month',
      months: '%d months',
      year: 'about a year',
      years: '%d years'
    };

    const template = function(t, n) {
      return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    if (!time) return;
    time = time.replace(/\.\d+/, ''); // remove milliseconds
    time = time.replace(/-/, '/').replace(/-/, '/');
    time = time.replace(/T/, ' ').replace(/Z/, ' UTC');
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
    time = new Date(time * 1000 || time);

    const now = new Date();
    const seconds = ((now.getTime() - time) * 0.001) >> 0;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    return (
      templates.prefix +
      ((seconds < 45 && template('seconds', seconds)) ||
        (seconds < 90 && template('minute', 1)) ||
        (minutes < 45 && template('minutes', minutes)) ||
        (minutes < 90 && template('hour', 1)) ||
        (hours < 24 && template('hours', hours)) ||
        (hours < 42 && template('day', 1)) ||
        (days < 30 && template('days', days)) ||
        (days < 45 && template('month', 1)) ||
        (days < 365 && template('months', days / 30)) ||
        (years < 1.5 && template('year', 1)) ||
        template('years', years)) +
      templates.suffix
    );
  }

  saveFeedsInLocal(feeds) {
    let data = {};
    const alreadyStoredFeeds = sessionStorage.getItem('feeds');

    if (alreadyStoredFeeds) {
      data = JSON.parse(alreadyStoredFeeds);
    }

    data[this.props.pageNo] = feeds;
    data = JSON.stringify(data);
    sessionStorage.setItem('feeds', data);
  }

  getFeedsFromLocal(pageNo = 0) {
    const data = sessionStorage.getItem('feeds');

    if (data) {
      let dataObj = JSON.parse(data);

      if (dataObj[pageNo] && dataObj[pageNo].length > 0) {
        return dataObj[pageNo];
      }
    }

    return false;
  }

  hideClickHandler(objectID) {
    const feeds = this.state.feeds;
    const updatedFeeds = [];

    for (let i = 0; i < feeds.length; i++) {
      const feed = feeds[i];
      const updatedFeed = { ...feed };

      if (feed.objectID === objectID) {
        updatedFeed.isHidden = true;
      }
      updatedFeeds.push(updatedFeed);
    }

    this.saveFeedsInLocal(updatedFeeds);
    this.setState({ feeds: updatedFeeds });
  }

  upvoteClickHandler(objectID) {
    const feeds = this.state.feeds;
    const updatedFeeds = [];

    for (let i = 0; i < feeds.length; i++) {
      const feed = feeds[i];
      const updatedFeed = { ...feed };

      if (feed.objectID === objectID) {
        updatedFeed.points = updatedFeed.points + 1;
      }
      updatedFeeds.push(updatedFeed);
    }

    this.saveFeedsInLocal(updatedFeeds);
    this.setState({ feeds: updatedFeeds });
  }

  getFeedPoints(feed) {
    const feedId = feed.objectID;
    const storedFeed = this.state.feeds.find(feed => feed.objectID === feedId);

    if (storedFeed) {
      return storedFeed.points;
    } else {
      return feed.points;
    }
  }

  render() {
    const feedList = this.state.feeds.map(feed => {
      return (
        !feed.isHidden && (
          <NewsFeedComponent
            key={feed.objectID}
            objectID={feed.objectID}
            username={feed.author}
            title={feed.title}
            noOfComments={feed.num_comments}
            upvotes={this.getFeedPoints(feed)}
            upvoteClick={() => this.upvoteClickHandler(feed.objectID)}
            domain={feed.url}
            postedTime={this.convertTime(feed.created_at)}
            hideClick={() => this.hideClickHandler(feed.objectID)}
          />
        )
      );
    });
    return (
      <div className='container'>
        <div className='feed-list'>{feedList}</div>
      </div>
    );
  }
}

export default NewsFeed;
