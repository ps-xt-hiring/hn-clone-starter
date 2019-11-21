import React from 'react';
import logo from './logo.svg';
import './App.css';


import StoryList from './StoryList';
import ListHeader from './ListHeader';

class App extends React.Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      currentView : 'top'
    };

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

          <div className="page-container">
            <ListHeader onViewChange={this.handleViewChange}></ListHeader>
            <StoryList view={currentView}></StoryList>
          </div>


        </header>
      </div>
    );
  }

}

export default App;
