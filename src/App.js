import React from "react";
import logo from "./logo.svg";
import "./App.css";
import News from "./components/News/News";
import Dummy from "./components/Dummy/Dummy";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav style={{}}>
          <a
            href="#"
            style={{
              borderColor: "white",
              borderWidth: "1px",
              borderStyle:'solid',
              padding: "3px"
            }}
          >
            <img src={"logo.gif"} height="20px" width="20px"></img>
          </a>
        </nav>
      </header>
      <News />
      {/* <Dummy /> */}
    </div>
  );
}

export default App;
