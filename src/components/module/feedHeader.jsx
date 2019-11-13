import React from "react";
import { Link } from "react-router-dom";

const FeedHeader = () => (
  <header className="header">
    <nav id="header-nav" aria-label="Header">
      <span className="header__logo">
        <Link to="/" title="logo">
          Y
        </Link>
      </span>
      <button aria-label="TopFeed" type="button">
        top
      </button>
      <span>|</span>
      <button aria-label="NewFeed" type="button">
        new
      </button>
    </nav>
  </header>
);

export default FeedHeader;
