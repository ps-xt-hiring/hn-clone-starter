import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router,

  Route,
  } from 'react-router-dom';
import ListingUI from "./components/Listing/ListingUI"



function App() {
  return (
   <Router>
     <Route exact path="/" component = {ListingUI} />
     <Route exact path="/news" component = {ListingUI} />
   </Router>
  );
}

export default App;
