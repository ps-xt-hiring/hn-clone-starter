import React from "react";
import "./Header.css";
import { labelConstants } from "../../static/constants";
function Header() {
  return (
    <header className="app-header">
      <nav>
        <a
          aria-label="Site Main Page"
          href="https://news.ycombinator.com/"
          className="logo"
        >
          <img
            src="logo.gif"
            title="Y Combinator"
            alt="Y Combinator"
            height="20px"
            width="20px"
          />
        </a>
        <a href="/top">{labelConstants.TOP}</a>
        <small>{labelConstants.SPLIT}</small>
        <a href="/news">{labelConstants.NEW}</a>
      </nav>
    </header>
  );
}
export default Header;
