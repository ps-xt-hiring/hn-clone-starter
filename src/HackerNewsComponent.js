import React from 'react';
import { fetchPageArticles } from './services/http-services.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Body from './components/Body.js';

class HackerNewsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      currentPage: 0,
      isLoading: false
    }
  }

  fetchArticles = (currentPage) => {
    this.setState({ isLoading: true });

    fetchPageArticles( currentPage )
    .then(resp => resp.json())
    .then(data => {
      this.setState({ articles: data.hits, isLoading: false, currentPage: currentPage + 1 })
    })
    .catch(() => {
      this.setState({ articles: [], isLoading: false });
    })

  }
  componentDidMount() {
    this.fetchArticles( this.state.currentPage );
  }

  handleHideClick = (key) => {
    this.setState({
      articles: this.state.articles.filter((_, i) => i !== key)
    });
  }

  handleMoreClick = () => {
    this.fetchArticles(this.state.currentPage);
  }

  handleUpVoteClick = (key) => {
    var articles = Object.assign({}, this.state.articles);
    articles[key].points += 1;
    this.setState(articles);
  }

  handleHomeClick = () => {
    this.setState( { currentPage: 0 }, () => {
      this.fetchArticles(0);
    } );
  }

  render() {
    return (
      <div className="app-container">
        <Header handleHomeClick={ this.handleHomeClick } />
        <Body
          articles={ this.state.articles }
          isLoading={ this.state.isLoading }
          handleHideClick={this.handleHideClick}
          handleUpVoteClick={this.handleUpVoteClick}
        />
        <Footer articlesLength={ this.state.articles.length } handleMoreClick={ this.handleMoreClick } />
      </div>
    )
  }
}
export default HackerNewsComponent;