import React from "react";
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ConnectedLanding from "./components/module/feedContainer";
import "./App.scss";

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={ConnectedLanding} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
};
export default App;
