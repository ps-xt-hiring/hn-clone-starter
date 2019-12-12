import React from "react";
import Header from "./Header";
import List from "./List";
import { getNewStories } from "../service/hnservice";
import { Wrapper,Page, Interactions, MoreLink } from "../styles/StoryStyles";
import {StaticText} from '../constant/StaticText'

const applyUpdateResult = result => prevState => ({
  hits: [...prevState.hits, ...result.data.hits],
  page: result.page
});

const applySetResult = result => prevState => ({
  hits: result.data.hits,
  page: result.data.page
});

class NewStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      page: null
    };
  }

  onInitialSearch = e => {
    e.preventDefault();
    const { value } = this.input;
    if (value === "") {
      return;
    }
    this.fetchStories(value, 0);
  };
  onPaginatedSearch = e =>
    this.fetchStories(this.input.value, this.state.page + 1);

  fetchStories = (value, page) =>
    getNewStories(value, page).then(result => this.onSetResult(result, page));

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

    handleUpVote = objectId => {
     const Feeds= JSON.parse(JSON.stringify(this.state.hits))
     const nextFeeds = Feeds.map(feed => {
      return feed.objectID === objectId
        ? { ...feed, points: feed.points + 1 }
        : feed;
    });
    this.setState({ hits: nextFeeds });
  };
  hideFeed= id => {
    const Feeds= JSON.parse(JSON.stringify(this.state.hits))
    const list = Feeds.filter(el => el.objectID !== id);

    this.setState({ hits: list });
  }; // end of toggle

  render() {
    return (
      <Page>
        <Interactions>
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={node => (this.input = node)} />
    <button type="submit">{StaticText.search}</button>
          </form>
        </Interactions>
        {this.state.hits.length > 0 ? <Header /> : null}
        <Wrapper>
          {this.state.hits.map((item, index) => (
            <List
              handleUpVote={this.handleUpVote}
              hideFeed={this.hideFeed}
              objectID={item.objectID}
              isOdd={index % 2}
              item={item}
            />
          ))}
          <div>
            {this.state.page !== null && (
              <MoreLink href="#" onClick={this.onPaginatedSearch}>
                {StaticText.more}
              </MoreLink>
            )}
          </div>
        </Wrapper>
      </Page>
    );
  }
}

export default NewStories;
