import React, { useEffect } from 'react';
import NewsList from './Lists';
import NewsHeader from '../NewsHeader';
import styled from 'styled-components';

export const Loader = styled.div`
position: fixed;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
z-index: 9999;
background: url('assets/images/loader.png') 
            50% 50% no-repeat rgb(249,249,249);
`;
export const LoadMoreNews = styled.button`
  color: #ff6600;
  font-size: 14px;
  display: block;
  cursor: pointer;
  border: none;
  background: none;
  padding: 8px 20px`;


const News = (props) => {
  useEffect(() => {
    const { getNews, page } = props;
    getNews(page);
  }, []);

  const loadMoreNews = () => {
    const { getNews, page } = props;
    getNews(page + 1);
  };

  const increaseVoteCount = newsId => {
    const { increaseVoteCount, newsListingData } = props;
    increaseVoteCount(newsId, newsListingData);
  };
  const { loading, newsListingData, sortNews, sortBy } = props;
  return (
    <>
      {loading ? <Loader><div className="newsLoader"></div></Loader> :
        <>
          <NewsHeader sortNews={sortNews} newsList={newsListingData} sortBy={sortBy} />
          <NewsList
            newsListingData={newsListingData}
            hideNews={newsId => props.hideNews(newsId, newsListingData)}
            increaseVoteCount={newsId => increaseVoteCount(newsId)}
          />
          <LoadMoreNews type="button" className="loadMoreItems" onClick={loadMoreNews}>More
            </LoadMoreNews>
        </>
      }
    </>
  );
}
export default News;