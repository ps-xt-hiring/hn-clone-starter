import React, { useEffect } from "react";
import Header from "./components/header/Header";
import StoryList from "./containers/story-list/StoryList";
import { fetchStoryList } from "./actions/storylist-action";
import { connect } from "react-redux";
import "./App.css";

const App = props => {
  useEffect(() => {
    props.fetchStoryList(1);
  }, []);

  return (
    <div className="App">
      <Header />
      <StoryList list={props.storyItems} />
    </div>
  );
};

const mapStateToProps = state => ({
  storyItems: state.storyList.list
});

const mapDispatchToProps = {
  fetchStoryList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
