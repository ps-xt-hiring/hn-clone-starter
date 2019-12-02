import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.span`
  cursor: pointer;
  font-size: 16px;  
  padding: 0.15em 0.25em!important;
  color: #fff;
  border: 1px solid #fff;
`;

const Header = styled.h3`
  background-color: #ff6600;
  padding: 10px 10px 9px 10px;
  display: flex;
  align-items: center;
  color: #fff;
  margin:0
  header > a {
  text-decoration: none;
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
  const {sortBy} = props;
  return (
  <Header>
    <div className="newsHeader">
      <Link to="/">
        <Logo>Y</Logo>
      </Link>
      <button onClick = { () => props.sortNews(1, props.newsList) } ><span className={sortBy === 1 ? "tab-selected" : null}>top</span></button>|
      <button onClick = { () => props.sortNews(2, props.newsList) } ><span className={sortBy === 2 ? "tab-selected" : null}>new</span></button>
    </div>
  </Header>
);
}

export default NewsHeader;
