import React from "react";
import { render } from "react-dom";
import App from "./shared/App";
// import './shared/App.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
