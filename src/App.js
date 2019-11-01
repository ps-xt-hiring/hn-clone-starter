import React from 'react';
import './App.css';
import Header from './components/header';
import ContentTable from './components/contentTable';
import Footer from './components/footer';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      tag: 'story',
      pageNo: 0,
    }
  }
  incrementPageNumber = () => {
    let temp= this.state.pageNo;
    temp++;
    this.setState({pageNo: temp});
  }
  changeTag = () => {
    let temp = (this.state.tag === 'story' ? 'front_page' : 'story');
    this.setState({tag: temp, pageNo: 0});
  }
  render(){
    return (
      <div className="App">
        <Header changeTag={this.changeTag} />
        <ContentTable tab={this.state.tag} pageNumber={this.state.pageNo} />
        <Footer changePage={this.incrementPageNumber}/>
      </div>
    );
  }
}

export default App;