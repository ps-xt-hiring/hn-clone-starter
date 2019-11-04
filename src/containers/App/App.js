import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.scss';
import * as types from './types';
import { toBaseURL } from '../../common/utils';

const App = () => {
  const state = useSelector(state => state.app.toJS());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: 0 });
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        Hacker News
      </header>
      <section className="app-section">
        {renderItems(state.data, dispatch)}
        <div className="app-section-more" onClick={() => handleMore(state.activePage, dispatch)}>More</div>
      </section>
    </div>
  );
}

const renderItems = (items, dispatch) => {
  
  return items.map(item => {
    return (<div key={item.objectID}>
      <span className="app-section-id">{item.objectID}</span>
      <span className="app-section-points">{item.points}<span className="arrow-up"></span></span>
      <span>{item.title}</span>
      <span className="app-section-url"><a href={item.url}>({toBaseURL(item.url)})</a> by</span>
      <span className="app-section-author">{item.author}</span>
      <span className="app-section-action">[ <span onClick={() => hideNews(item.objectID, dispatch)}>hide</span> ]</span>
    </div>)
  })
}

const hideNews = (objectID, dispatch) => {
  dispatch({ type: types.HIDE_NEWS, objectID });
}

const handleMore = (activePage, dispatch) => {
  dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: activePage + 1});
}
export default App;
