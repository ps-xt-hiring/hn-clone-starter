import React from "react";
import { Link } from "react-router-dom";
import Constants from "../../constants/constants"

const FeedHeader = () => (
  <header className="header">
    <nav className="nav">
      <Link className="header__nav-logo" to="/" title="logo">
        {Constants.logoText}
      </Link>
      <Link to="/" title={Constants.top} className="header__nav-top" >
        {Constants.top}
      </Link>
      <Link to="/" title={Constants.new} className="header__nav-new" >
        {Constants.new}
      </Link>

    </nav>
  </header >
);

export default FeedHeader;
