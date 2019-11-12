import React, { Component, Fragment } from "react";
import Header from "../Header/Header";
import NewsSection from "../NewsSection/NewsSection";

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <NewsSection></NewsSection>
      </Fragment>
    );
  }
}

export default Layout;
