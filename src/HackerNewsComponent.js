import React from 'react';
import { fetchPageArticles } from './services/http-services';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

class HackerNewsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.scopeBindings();

    this.state = {
      articles: [],
      currentPage: 0,
      isLoading: false,
    };
  }

  scopeBindings() {
    this.fetchArticles = this.fetchArticles.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind( this );
    this.handleUpVoteClick = this.handleUpVoteClick.bind( this );
    this.handleMoreClick = this.handleMoreClick.bind( this );
    this.handleHideClick = this.handleHideClick.bind( this );
  }

  componentDidMount() {
    const { currentPage } = this.state;
    this.fetchArticles(currentPage);
  }

  fetchArticles(currentPage) {
    this.setState({ isLoading: true });

    fetchPageArticles(currentPage)
      .then(resp => resp.json())
      .then((data) => {
        this.setState({ articles: data.hits, isLoading: false, currentPage: data.page });
      })
      .catch(() => {
        this.setState({ articles: [], isLoading: false });
      });
  }

  handleHideClick(key) {
    const { articles } = this.state;
    this.setState({
      articles: articles.filter((_, i) => i !== key),
    });
  }

  handleMoreClick() {
    const { currentPage } = this.state;
    this.fetchArticles(currentPage + 1);
  }

  handleUpVoteClick(key) {
    const { articles } = this.state;
    const articlesClone = Object.assign({}, articles);
    articlesClone[key].points += 1;
    this.setState(articlesClone);
  }

  handleHomeClick() {
    this.setState({ currentPage: 0 }, () => {
      this.fetchArticles(0);
    });
  }

  render() {

    const { articles, isLoading } = this.state;

    return (
      <div className="app-container">
        <Header handleHomeClick={this.handleHomeClick} />
        <Body
          articles={articles}
          isLoading={isLoading}
          handleHideClick={this.handleHideClick}
          handleUpVoteClick={this.handleUpVoteClick}
        />
        <Footer
          isLoading={isLoading}
          articlesLength={articles.length}
          handleMoreClick={this.handleMoreClick}
        />
      </div>
    );
  }
}

export default HackerNewsComponent;
