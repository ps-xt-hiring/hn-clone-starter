import React from 'react';
import './App.css';
import Header from './components/header';
import ContentTable from './components/contentTable';
import Footer from './components/footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: 'story',
      pageNo: 0,
    };
  }

  incrementPageNumber = () => {
    const { pageNo } = this.state;
    let temp = pageNo;
    temp += 1;
    this.setState({ pageNo: temp });
  }

  changeTag = () => {
    const { tag } = this.state;
    const temp = (tag === 'story' ? 'front_page' : 'story');
    this.setState({ tag: temp, pageNo: 0 });
  }

  render() {
    const { tag, pageNo } = this.state;
    return (
      <div className="App">
        <Header changeTag={this.changeTag} />
        <ContentTable tab={tag} pageNumber={pageNo} />
        <Footer changePage={this.incrementPageNumber} />
      </div>
    );
  }
}

export default App;
