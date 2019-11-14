import React from "react";
import { Link } from "react-router-dom";
import FeedButton from "./feedButton"
import feedConstants from "../../constants/constants"

const FeedHeader = () => (
  <header className="header">
    <span className="header__logo">
      <Link to="/" title="logo">
        Y
        </Link>
    </span>
    <FeedButton
      text={feedConstants.top}
    />
    <span>|</span>
    <FeedButton
      text={feedConstants.new}
    />
  </header>
);

export default FeedHeader;
