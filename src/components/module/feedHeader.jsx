import React from "react";
import { Link } from "react-router-dom";

const FeedHeader = () => (
  <header className="header">
    <span className="header__logo">
      <Link to="/" title="logo">
        Y
        </Link>
    </span>
    <button type="button">
      top
      </button>
    <span>|</span>
    <button type="button">
      new
      </button>
  </header>
);

export default FeedHeader;
