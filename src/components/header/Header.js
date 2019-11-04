import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <a href="/">{/* <img src="y18.gif" width="18" height="18" /> */}Y</a>
      </div>
      <div className="header-nav">
        <a href="/">top</a> | <a href="/">new</a>
      </div>
    </div>
  );
};

export default Header;
