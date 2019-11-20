import React from 'react';
// import logo from '../assets/logo.svg';
import WithClass from '../hoc/WithClass';
import FrontPage from '../FrontPage/FrontPage';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

import './App.scss';
import '../helpers/_utils.scss';


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && 
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
}

function App() {
  return (
    <WithClass classes='App'>
      <FrontPage/>
      <LoadingIndicator />
    </WithClass>
  );
}

export default App;
