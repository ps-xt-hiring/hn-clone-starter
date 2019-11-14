import React from 'react';
import { fetchPageArticles } from './services/http-services';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

class HackerNewsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.fetchArticles = this.fetchArticles.bind(this);

    this.state = {
      articles: [],
      currentPage: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchArticles(this.state.currentPage);
  }

  fetchArticles(currentPage) {
    this.setState({ isLoading: true });

    fetchPageArticles(currentPage)
      .then(resp => resp.json())
      .then((data) => {
        this.setState({ articles: data.hits, isLoading: false, currentPage: currentPage + 1 });
      })
      .catch(() => {
        this.setState({ articles: [], isLoading: false });
      });
  }

  handleHideClick(key) {
    this.setState({
      articles: this.state.articles.filter((_, i) => i !== key),
    });
  }

  handleMoreClick() {
    this.fetchArticles(this.state.currentPage);
  }

  handleUpVoteClick(key) {
    const articles = Object.assign({}, this.state.articles);
    articles[key].points += 1;
    this.setState(articles);
  }

  handleHomeClick() {
    this.setState({ currentPage: 0 }, () => {
      this.fetchArticles(0);
    });
  }

  render() {
    return (
      <div className="app-container">
        <Header handleHomeClick={this.handleHomeClick} />
        <Body
          articles={this.state.articles}
          isLoading={this.state.isLoading}
          handleHideClick={this.handleHideClick}
          handleUpVoteClick={this.handleUpVoteClick}
        />
        <Footer
          articlesLength={this.state.articles.length}
          handleMoreClick={this.handleMoreClick}
        />
      </div>
    );
  }
}
export default HackerNewsComponent;
