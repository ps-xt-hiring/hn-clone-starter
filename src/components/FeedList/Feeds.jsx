import React, { useReducer, useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import extractDomain from 'extract-domain';
import feedsReducer from './feedsReducer';
import HeaderTemplate from './templates/HeaderTemplate';
import Loader from '../Loader/Loader';
import { TOP, NEW, MORE } from '../../utils/constants';
import fetchFeeds from '../../utils/apiCalls';
import List from '../List';
import UpVote from '../upVote';
import './feeds.scss';

export default function FetchFeeds() {
  const [page, setPage] = useState(0);
  const [result, setResult] = useState([]);
  const [state, dispatch] = useReducer(feedsReducer, {
    isLoading: false,
    isError: false,
    data: []
  });

  useEffect(() => {
    fetchFeeds(dispatch, state, page);
  }, []);

  useEffect(() => {
    if (!state.isLoading && state.data.length !== 0) {
      setResult([...result, ...state.data.data.hits]);
    }
  }, [state]);

  const handleSeeMore = (e) => {
    e.preventDefault();
    setPage(page + 1);
    fetchFeeds(dispatch, state, page + 1);
  }

  const seeMore = () => {
    return (
      <button className='btn-link' onClick={handleSeeMore} >{MORE}</button>
    )
  }

  const handleListData = (item) => {
    const results = [];

    results.push(item.num_comments);
    results.push(<UpVote score={item.relevancy_score} id={item.objectID} />);
    results.push(() => {
      const url = item.url ? item.url : '';
      return (
        <> 
          {item.title} <a href={url}>({extractDomain(url)})</a><span> by</span> {item.author} {<TimeAgo date={item.created_at} />}
        </>
      );
    });

    return results;
  }

  return (
    <div className='feeds-wrapper'>
      <HeaderTemplate data={[TOP, NEW]} />
      {result.length !== 0 &&
        <>
          <List items={result.map((item) => <List items={handleListData(item)} />)} />
          <List className='see-more' items={[seeMore]} />
        </>
      }

      <Loader loading={state.isLoading} />
    </div>
  )
}
