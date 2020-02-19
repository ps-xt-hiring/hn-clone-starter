import React, { useEffect } from 'react';
import Header from './components/header/Header';
import Feed from './components/feeds/Feeds';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { changeSortType, changeLoadMorePage, getInitialFeed } from './reducers/feedReducer';

function App() {
	
	const dispatch = useDispatch();
	const feed = useSelector(state => state.feeds);
	const page = useSelector(state => state.page);
	const sortType = useSelector(state => state.sortType);
	const hasMore = useSelector(state => state.hasMore);

  //fetch feeds
	const fetchFeedsHandler = (isSortTypeChanged,_sortType) => {
		dispatch(getInitialFeed(page,_sortType));
	};
	const loadMore = () => {
		dispatch(changeLoadMorePage(page,sortType));
		
	};

	useEffect(() => {
		fetchFeedsHandler(false,sortType)
	},[]);


	const setSortType = (_sortType) => {
		dispatch(changeSortType(page,_sortType));
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
