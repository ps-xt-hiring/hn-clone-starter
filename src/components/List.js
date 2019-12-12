import React from "react";
import PropTypes from 'prop-types';
import { Item, ExternalLink, HideLink } from "../styles/StoryStyles";

const List = props => {
  const handleUpVote = () => {
    props.handleUpVote(props.objectID);
  };
  const hideFeed = () => {
    props.hideFeed(props.objectID);
  };
  return (
    <Item isOdd={props.isOdd} key={props.objectID}>
      <span>{props.item.num_comments}</span>
      <span>
        {" "}
        <a href="#" onClick={handleUpVote}>
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

List.propTypes={

    item : PropTypes.object,
    handleProductUpVote : PropTypes.func,
    hideFeed : PropTypes.func

}
export default List;
