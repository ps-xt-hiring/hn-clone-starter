import React from "react";

const NewsList = props => (
  <div>
    <a href={props.navigateTo} aria-describedBy={props.displayText}>
      {props.displayText}
    </a>
    {` `}
    <a href={props.navigateTo} aria-describedBy={props.navigateTo}>{`(${
      props.navigateTo
    })`}</a>
  </div>
);

export default NewsList;
