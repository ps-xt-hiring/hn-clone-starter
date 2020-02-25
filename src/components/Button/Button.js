import React from "react";
import "./Button.css";
function Button(props) {
  const { news, onClick, title } = props;
  return (
    <button
      className="link-button"
      id={news && news.objectID}
      title={title}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}
export default Button;
