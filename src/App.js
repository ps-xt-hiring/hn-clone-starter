import React, { useEffect, useState } from 'react';
import {  HEADER_TOP, HEADER_CATEGORY_FRONT, HEADER_CATEGORY_NEW, HEADER_NEW } from './constants';
import Header from './components/header/Header';
import Feed from './components/feeds/Feeds';
import {fetchFeedsData} from './actions/feedsData';
import './App.css';

function App() {
	const [feed, setFeed] = useState([]);
	const [page, setPage] = useState(0);
	const [sortType, setSortType] = useState(HEADER_TOP);
	const [hasMore, setHasMore] = useState(true);

  //fetch feeds
  const fetchFeedsHandler = (isSortTypeChanged,_sortType) => {
	  
	let order = null
	if(_sortType === HEADER_TOP) {
		order = HEADER_CATEGORY_FRONT;
	}
	if (_sortType === HEADER_NEW) {
		order = HEADER_CATEGORY_NEW
	}
    fetchFeedsData(page, order)
      .then(res => {
        let result = res.hits;
		result = result.filter(item => item.title);
		if(!isSortTypeChanged) {
			setFeed([...feed,...result]);
		} else {
			setFeed([...result]);
		}
		
      
        if (page + 1 === res.nbPages) {
          setHasMore(false);
        }
      })
      .catch(err => {
        setFeed([]);
        setHasMore(false);
      });
  };
   const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
	fetchFeedsHandler(false,sortType)
}, [page]);

useEffect(() => {
	fetchFeedsHandler(true,sortType)
}, [sortType]);


  return (
	<div className="App">
	  <main>
		<div className="App">
		  <Header sortType={sortType} setSortType={setSortType} />
		  <Feed feed={feed} loadMore={loadMore} hasMore={hasMore} />
		</div>
	  </main>
	   
	</div>
  );
}

export default App;
