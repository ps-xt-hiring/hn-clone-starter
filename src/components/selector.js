import { createSelector } from 'reselect';

const newsSelector = state => state.news || [];

export const newsDataSelector = createSelector(
  newsSelector,
  (news) => news.newsData || []
);
