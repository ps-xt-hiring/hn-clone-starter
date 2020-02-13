import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import NewsList from './components/NewsList';
import NavBar from './components/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPageId: 2
    }
  }

  loadMoreTriggered = () => {
    this.setState((oldState) => ({
      nextPageId: oldState.nextPageId + 1
    }));
  }
  
  render() {
    return (
    <Router>
      <div>
        <NavBar navList={[{name:'Top' , link:'/'}, {name:'New' , link:'/'}]} />

        <Switch>
          <Route path="/" exact component={NewsList} />
          <Route path="/page/:id" component={NewsList} />
        </Switch>
        <div>
          <Link to={`/page/${this.state.nextPageId}`} title="load more" onClick={this.loadMoreTriggered}>Load More</Link>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
