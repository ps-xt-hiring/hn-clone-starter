import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GENERALS } from '../../utilities/genericConstants';

const Header = styled.h3`
  background-color: #ff6600;
  padding: 10px 10px 0px 10px;
  display: flex;
  align-items: center;
  color: #fff;
  margin:0
  .newsHeader > a {
  text-decoration: none;
 }
 img{
  width: 40px;
  height:40px
 }
 a,span.header-top {
   float:left
 }
 .header-top {
   line-height: 35px
 }
 a {
    float: left;
    line-height: 35px;
 }
  button{
    font-size: 14px;
    line-height: 12px;
    color: #ffffff;
    padding: 4px 12px;
    cursor: pointer;
    background: transparent;
    border:none;
    user-select: none
  }
  .tab-selected{
    color:#000
  }
  `;

const NewsHeader = (props) => {
  const { sortBy } = props;
  return (
    <Header>
      <div className="newsHeader">
        <Link to="/">
          <img src="assets/images/logo.png" alt="Hacker News" />
        </Link>
        <span className="header-top">
          <button onClick={() => props.sortNews(1, props.newsList)} ><span className={sortBy === 1 ? "tab-selected" : null}>{GENERALS.top}</span></button>|
          <button onClick={() => props.sortNews(2, props.newsList)} ><span className={sortBy === 2 ? "tab-selected" : null}>{GENERALS.new}</span></button>
        </span>
      </div>
    </Header>
  );
}

export default NewsHeader;
