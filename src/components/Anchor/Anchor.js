import React from "react";
import "./Anchor.scss";
function Anchor(props) {
  const { news, target, ariaLabel } = props;
  return (
    <a href={news && news.url} target={target} aria-label={ariaLabel}>
      {props.children}
    </a>
  );
}
export default Anchor;
