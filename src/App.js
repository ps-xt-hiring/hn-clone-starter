import React, { useEffect } from 'react';
import {  HEADER_TOP, HEADER_CATEGORY_FRONT, HEADER_CATEGORY_NEW, HEADER_NEW } from './constants';
import Header from './components/header/Header';
import Feed from './components/feeds/Feeds';
import {fetchFeedsData} from './actions/feedsData';
import { INIT_FEEDS , UPDATE_PAGE, SORT_TYPE,HAS_MORE } from './actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

function App() {
	
	const dispatch = useDispatch();
	const feed = useSelector(state => state.feeds);
	const page = useSelector(state => state.page);
	const sortType = useSelector(state => state.sortType);
	const hasMore = useSelector(state => state.hasMore);

  //fetch feeds
  const fetchFeedsHandler = () => {
	  
	let order = null
	if(sortType === HEADER_TOP) {
		order = HEADER_CATEGORY_FRONT;
	}
	if (sortType === HEADER_NEW) {
		order = HEADER_CATEGORY_NEW
	}
    fetchFeedsData(page, order)
      .then(res => {
        let result = res.hits;
		result = result.filter(item => item.title);
		dispatch({ type: INIT_FEEDS, payload:[...feed,...result] });
		
      
        if (page + 1 === res.nbPages) {
			dispatch({ type: HAS_MORE, payload:false })
        }
      })
      .catch(err => {
		dispatch({ type: INIT_FEEDS, payload:[] });
		
        dispatch({ type: HAS_MORE, payload:false })
      });
  };
   const loadMore = () => {
	dispatch({ type: UPDATE_PAGE, payload:page +1 });
    
  };

	useEffect(() => {
		fetchFeedsHandler()
	}, [page,sortType]);

	const setSortType = () =>{
		dispatch({ type: SORT_TYPE, payload:sortType });
	}

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
