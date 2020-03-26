import React from "react";
import "./App.css";

import { Header, Feeds, Footer } from "./container";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main-block">
        <Feeds />
      </main>
      <Footer />
    </div>
  );
}

export default App;
