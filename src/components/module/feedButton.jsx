import React from "react";


const FeedButton = (props) => (
  <button
    type="button"
    className={props.className}
    onClick={props.event}
  >{props.text}</button>
);


export default FeedButton;
