import React from "react";
import { Link } from "react-router-dom";
import feedConstants from "../../constants/constants"

const FeedHeader = () => (
  <header className="header">
    <nav className="nav">
      <Link className="header__nav-logo" to="/" title="logo">
        {feedConstants.logoText}
      </Link>
      <Link to="/" title={feedConstants.top} className="header__nav-top" >
        {feedConstants.top}
      </Link>
      <Link to="/" title={feedConstants.new} className="header__nav-new" >
        {feedConstants.new}
      </Link>

    </nav>
  </header >
);

export default FeedHeader;
