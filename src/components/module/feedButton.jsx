import React from "react";


const FeedButton = (props) => {
  const { className, event, btntext } = props;
  return <button
    type="button"
    className={className}
    onClick={event}
  >{btntext}</button>
}


export default FeedButton;
