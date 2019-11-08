import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import * as types from './types';
import logo from '../../images/y18.gif';
import Button from '../../components/Button/Button';
import TableRow from '../../components/TableRow/TableRow';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const renderTableRows = (items, dispatch) => items.map((item, index) => {
  const rowBgStyle = index % 2 === 0 ? 'table-row-even' : 'table-row-odd';
  return (
    <TableRow
      key={item.objectID}
      item={item}
      handleUpVote={handleUpVote}
      hideNews={hideNews}
      dispatch={dispatch}
      rowBgStyle={rowBgStyle}
    />
  );
});

const renderTableData = (items, dispatch) => (
  <div className="table-responsive">
    <table className="table">
      <tbody>
        {renderTableRows(items, dispatch)}
      </tbody>
    </table>
  </div>
);

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
        <Button variant="other" onClick={() => handleGotoFirst(dispatch)} title="top" className="app-section-top" />
        <span className="app-header-new">| new </span>
      </header>
      <section className="app-section">
        {state.fetching ? (<div>Loading...</div>) : renderTableData(state.data, dispatch)}
        {state.data.length !== 0
          ? (<Button variant="primary" onClick={() => handleMore(state.activePage, dispatch)} title="More" className="app-section-more" />)
          : (<Button variant="primary" onClick={() => handleGotoFirst(dispatch)} title="Go to First Page" className="app-section-gotofirstpage" />) }
      </section>

    </div>
  );
};

export default App;
