import React, { Component } from 'react';

import { service } from '../../utility/service-call'

import Header from '../header'
import List from '../list'
import Footer from '../footer'

import './style.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      feedData: [],
      page: 0
    }
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed = () => {
    service(`https://hn.algolia.com/api/v1/search?tags=story&page=${this.state.page + 1}`).then(response => {
      this.setState((currentState) => {
        return {
          feedData: response.hits || [],
          page: currentState.page + 1
        }
      });
    }).catch(error => {
      console.warn({ error });
    })
  }

  onClickMore = () => {
    /* this.setState((currentState) => {
      return {
        page: currentState.page + 1
      }
    }); */
    this.fetchFeed();
  }
  render() {
    return (
      <div className="app-container">
        <Header />
        {(this.state.feedData && this.state.feedData.length)
          ? <List feedData={this.state.feedData} />
          : <main>Loading</main>}
        <Footer page={this.state.page} handleMore={this.onClickMore} />
      </div>
    );
  }
}

export default App;
