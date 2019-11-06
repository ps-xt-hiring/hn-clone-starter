import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import * as types from './types';
import { toBaseURL, getFormattedDate } from '../../common/utils';
import logo from '../../images/y18.gif';
import Button from '../../components/Button/Button';


const hideNews = (objectID, dispatch) => {
  dispatch({ type: types.HIDE_NEWS, objectID });
};

const handleMore = (activePage, dispatch) => {
  dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: activePage + 1 });
};

const handleUpVote = (objectID, dispatch) => {
  dispatch({ type: types.UP_VOTE, objectID });
};

const handleGotoFirst = (dispatch) => {
  dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: 0 });
};

const renderItems = (items, dispatch) => items.map((item, index) => (
  <div key={item.objectID} className={index % 2 === 0 ? 'app-section-even' : 'app-section-odd'}>
    <span className="app-section-comments">{item.num_comments}</span>
    <span className="app-section-points">
      {item.points}
      <span className="arrow-up" onClick={() => handleUpVote(item.objectID, dispatch)} role="button" onKeyUp={() => {}} tabIndex="0" />
    </span>
    <span>{item.title}</span>
    <span className="app-section-url">
      <a href={item.url} className="app-section-link">
        (
        {toBaseURL(item.url)}
        )
      </a>
      by
    </span>
    <span className="app-section-author">{item.author}</span>
    <span className="app-section-date">{getFormattedDate(item.created_at)}</span>
    <span className="app-section-action">
    [
      <Button variant="secondary" onClick={() => hideNews(item.objectID, dispatch)} title="hide" className="app-section-hide" />
    ]
    </span>
  </div>
));

const App = () => {
  // eslint-disable-next-line no-shadow
  const state = useSelector(state => state.app.toJS());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.GET_NEWS_API_CALL_REQUEST, page: 0 });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="logo" className="app-header-logo" />
        <Button variant="other" onClick={() => handleGotoFirst(dispatch)} title="top" />
        <span className="app-header-new">| new </span>
      </header>
      <section className="app-section">
        {state.fetching ? (<div>Loading...</div>) : renderItems(state.data, dispatch)}
        {state.data.length !== 0
          ? (<Button variant="primary" onClick={() => handleMore(state.activePage, dispatch)} title="More" className="app-section-more" />)
          : (<Button variant="primary" onClick={() => handleGotoFirst(dispatch)} title="Go to First Page" />) }
      </section>

    </div>
  );
};

export default App;
