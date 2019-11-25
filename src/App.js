import React from 'react';
import logo from './logo.svg';
import './App.css';

import Constants from './constants';
import StoryList from './components/StoryList';
import ListHeader from './components/ListHeader';
import DataEngine from './components/DataEngine';

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';


class App extends React.Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      currentView : 'top'
    };

    // Initialize JSTimeAgo package with English locale
    JavascriptTimeAgo.locale(en);

    this.handleViewChange = this.handleViewChange.bind(this);
  }

  handleViewChange(view) {
    this.setState({
      currentView: view
    });
  }


  render() {
    const {currentView} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" aria-label="Sapient XT Hiring Assessment Logo" />
        </header>
        <div className="page-container">
          <ListHeader onViewChange={this.handleViewChange}></ListHeader>
          <StoryList view={currentView}></StoryList>
        </div>

        <div id="reset-cache-link" onClick={()=> DataEngine.resetCache() }>
          <span>{Constants.Text.resetCache}</span>
        </div>

      </div>
    );
  }

}

export default App;
