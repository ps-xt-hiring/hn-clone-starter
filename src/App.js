import React from 'react';
import './App.css';
import Constants from './constants';
import StoryList from './components/StoryList';
import Header from './components/Header';

class App extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      currentView: 'top',
    };

    this.handleViewChange = this.handleViewChange.bind(this);
  }

  handleViewChange(view) {
    this.setState({
      currentView: view,
    });
  }


  render() {
    const { currentView } = this.state;
    return (
      <div className="App">
        <header className="App-header">

          <div className="Container">
            <Header onViewChange={this.handleViewChange} />
            <StoryList view={currentView} />
          </div>

        </header>
      </div>
    );
  }
}

export default App;
