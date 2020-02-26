// component for header page

import React from "react";
import "./Header.scss";
import { labelConstants, urlConfilg } from "../../static/constants";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
function Header() {
  return (
    <header className="app-header">
      <nav>
        <Anchor ariaLabel="Hacker news dashboard" target="_blank">
          <img
            src={urlConfilg.logoUrl}
            title="Y Combinator"
            alt="Y Combinator"
            height="20px"
            width="20px"
          />
        </Anchor>
        <Button>{labelConstants.TOP}</Button>
        <small>{labelConstants.SPLIT}</small>
        <Button>{labelConstants.NEW}</Button>
      </nav>
    </header>
  );
}
export default Header;
