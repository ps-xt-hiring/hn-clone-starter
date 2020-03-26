import React, { useState } from 'react';
import './App.scss';

import Header from './Header/Header.component';
import NewsFeed from './NewsFeed/NewsFeed.container';

function App() {
  const [pageNo, setPageNo] = useState(0);
  return (
    <div className="App">
      <Header />
      <NewsFeed pageNo={pageNo} />
      <button
        className="btn btn-secondary m-2"
        type="button"
        onClick={() => {
          setPageNo(pn => pn + 1);
        }}
      >
        More Feeds
      </button>
    </div>
  );
}
export default App;
