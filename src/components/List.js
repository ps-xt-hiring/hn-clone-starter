import React from "react";
import { Item, ExternalLink, HideLink } from "../styles/StoryStyles";

const List = props => {
  const handleProductUpVote = () => {
    props.handleProductUpVote(props.objectID);
  };
  const hideFeed = () => {
    props.hideFeed(props.objectID);
  };
  return (
    <Item isOdd={props.isOdd} key={props.objectID}>
      <span>{props.item.num_comments}</span>
      <span>
        {" "}
        <a href="#" onClick={handleProductUpVote}>
          <img src="/upvote.png" width={20} alt="upvote"></img>
        </a>
      </span>
      <span>{props.item.points}</span>
      <span>{props.item.title}</span>
      <ExternalLink href={props.item.url}>
        {props.item.url ? props.item.url : null}
      </ExternalLink>
      <span>by: {props.item.author}</span>
      <span>{props.item.created_at}</span>
      <HideLink>
        <a href="#" onClick={hideFeed}>
          [hide]
        </a>
      </HideLink>
    </Item>
  );
};

export default List;
