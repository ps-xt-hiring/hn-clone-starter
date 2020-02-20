import React from "react";
import News from "./components/News/News";

function App() {
  return (
    <React.Fragment>
      <header className="app-header">
        <a
          aria-label="Site Main Page"
          href="https://news.ycombinator.com/"
          style={{
            borderColor: "white",
            borderWidth: "1px",
            borderStyle: "solid",
            marginLeft: "5px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img src="logo.gif" alt="Y Combinator" height="20px" width="20px" />
        </a>
      </header>
      <News />
    </React.Fragment>
  );
}

export default App;
