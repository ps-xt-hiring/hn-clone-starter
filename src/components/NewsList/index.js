/* eslint import/no-named-as-default: 0 */
/* eslint import/no-named-as-default-member: 0 */

import React, {
  useReducer, useEffect, useState,
} from 'react';
import News from '../News';
import { reducer, initialState } from './reducer';
import NewsAPI from '../../Services/APIs/NewsAPI';
import { setNewsAsHidden, getHiddenNews } from '../../utils/helper';
import { LoadMoreBtn, ListWraper } from '../Styled';

const NewsApi = new NewsAPI();

const NewsList = () => {
  const [hiddenIds, setHiddenIds] = useState(getHiddenNews());
  const [state, dispatch] = useReducer(reducer, initialState);
  const { newsList, processing } = state;

  useEffect(() => {
    NewsApi.fetch(dispatch);
  }, []);

  /**
   * Hide news and re-render.
   * @param {*} newsId
   */
  const hideNews = (newsId) => {
    setNewsAsHidden(newsId);
    setHiddenIds([...hiddenIds, newsId]);
  };

  if (!newsList || !newsList.length) {
    return (
      <h6>No news found yet...</h6>
    );
  }

  return (
    <section>
      <ListWraper>
        {newsList.map(news => !hiddenIds.includes(news.objectID) && (
          <News key={news.objectID} news={news} hideNews={hideNews} />
        ))}
        <li className="paginationWrapper">
          <div className="left" />
          <div className="right">
            {
              processing
                ? <span className="loader">Loading...</span>
                : <LoadMoreBtn onClick={() => NewsApi.loadMore()}>More</LoadMoreBtn>
            }
          </div>
        </li>
      </ListWraper>
    </section>
  );
};

export default NewsList;
