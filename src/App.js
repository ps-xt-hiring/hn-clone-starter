import React from "react";
import News from "./components/News/News";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <a
            href="https://news.ycombinator.com/"
            style={{
              borderColor: "white",
              borderWidth: "1px",
              borderStyle:'solid',
              marginLeft:'5px',
              display:'flex',
              justifyContent:'center'
            }}
          >
            <img src={"logo.gif"} alt="Y Combinator" height="20px" width="20px"></img>
          </a>
        </nav>
      </header>
      <News />
      {/* <Dummy /> */}
    </div>
  );
}

export default App;
