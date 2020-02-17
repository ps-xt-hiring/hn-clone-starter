import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import News from '../components/news/news';

const Div = styled.div`
  &.container{
    width: 80%;
    padding: 20px;
    font-size: 12px;
  }
  &.wrapper {
    display: inline;
  }

  ul{
    list-style: none;
    li {
        background: #f8f8f4; 
        padding: 5px 0;
    }
    li:nth-child(even) { 
        background: #ececdf; 
    }
    span {
          margin-right: 5px;
        }
        .num-comments {
          width: 50px;
          display: inline-block;
          text-align: right;
          margin-right: 30px;
        }
        .low {
          color: black;
        }
        .medium {
          color: brown
        }
        .high {
          color: red;
        }
        button {
          background-color: Transparent;
          background-repeat:no-repeat;
          border: none;
          cursor:pointer;
          overflow: hidden;
          outline:none;
        }
        .domain, 
        .author, 
        .created, 
        .btn-hide,
        .label-by {
          font-size: 11px;
        }
        .domain,
        .created,
        .label-by {
          color: #828282
        }
  }
`;

const Button = styled.button`
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;
  padding-left: 50px;
  color: #ff6600; 
`;

function frontPage() {
  const [news, fetchNews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    axios.get(`https://hn.algolia.com/api/v1/search?page=${pageNumber}`)
      .then((res) => {
        fetchNews(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  return (
    <Div className="container">
      <ul className="news-listing">
        {news.map((list, index) => (
          <li key={index} className={index}>
            <News
              post={list}
              index={index}
            />
          </li>
        ))}
      </ul>
      <div><Button type="button" className="btn-more" onClick={loadMore}>More</Button></div>
    </Div>
  );
}

export default frontPage;
