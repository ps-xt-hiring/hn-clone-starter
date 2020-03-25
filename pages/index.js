import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Header from '../components/Header';
import NewsRow from '../components/NewsRow';
import fetch from 'node-fetch';
import { getActivity, getNewState } from '../utils/helper';
import { MORE } from '../utils/constants';

function Home({ data, page }) {
  const [news, updateNews] = useState(data);
  useEffect(() => {
    updateNews(data);
  }, [data]);
  const handleVoteClick = (objectID, itemIndex) => {
    updateNews(getNewState(news, objectID, itemIndex, 'upvote'));
  }
  const handleHideClick = (objectID, itemIndex) => {
    updateNews(getNewState(news, objectID, itemIndex, 'hide'));
  }

  let hideActivity = getActivity('hide');
  let upvoteActivity = getActivity('upvote');
  return (
    <div className="container flex">
      <Header />
      <div className="content-wrapper">
        {news.hits.map((item, index) => {
          return <NewsRow {...item}
            key={item.objectID}
            handleVoteClick={handleVoteClick}
            handleHideClick={handleHideClick}
            itemIndex={index}
            hideActivity={hideActivity}
            upvoteActivity={upvoteActivity}
          />
        })}
      </div>
      <footer>
        <Link href={`?page=${parseInt(page) + 1}`} >
          <a className="load-more">{MORE}</a>
        </Link>
      </footer>
      <style jsx="true">{`
          .flex {
            display: flex;
          }
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            flex-direction: column;
          }
          .content-wrapper {
            margin-top: 20px;
          }
          
          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>

      <style jsx="true" global="true">{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }
          * {
            box-sizing: border-box;
          }
          .btn {
            background-color: Transparent;
            border: 0;
            cursor: pointer;
          }
          a {
            text-decoration: none;
          }
          a.underline:hover {
            text-decoration: underline;
          }
          .color-white {
            color: #ffffff;
          }
          .color-black {
            color: #000000;
          }
          .color-gray {
            color: #808080;
          }
          .app-logo {
            border: 1px solid #ffffff;
            padding: 2px 4px;
            margin-right: 10px;
          }
        `}</style>
    </div>

  )
  // }

}


export async function getServerSideProps({ query: { page = 0 } }) {
  // Fetch data from external API
  const res = await fetch(`http://hn.algolia.com/api/v1/search?query=&page=${page}`)
  const data = await res.json();
  let filteredData = data.hits.filter((item, index) => {
    return (item.title) ? true : false;
  });
  data.hits = filteredData;
  // Pass data to the page via props
  return { props: { data, page } }
}

export default Home
