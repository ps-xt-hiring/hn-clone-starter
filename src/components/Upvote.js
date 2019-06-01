import React from "react";

const upvoteClicked = data => {
  return data;
};

const Upvote = props => (
  <button
    className="upvote-btn"
    onClick={upvoteClicked(props.data)}
    aria-describedBy="Upvote"
  />
);

export default Upvote;
