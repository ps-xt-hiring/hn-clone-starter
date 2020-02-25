import React from 'react';
import "./Button.css"
function Button(props){
    const {news, onClick} = props;
    return <button
    className="link-button"
    id={news && news.objectID}
    title="upvote"
    onClick={onClick}
  >
      {props.children}
  </button>
}
export default Button;