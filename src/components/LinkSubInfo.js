import react from "react";

const LinkSubInfo = props => (
  <div>
    <span>{`${props.points} by`}</span>
    {` | `}
    <a
      href={props.authorUrl}
      aria-describedBy={`${props.points} by ${props.author}`}
    >
      {props.author}
    </a>
    {` `}{" "}
    <a href="#" aria-describedBy={props.timeAgo}>
      {props.timeAgo}
    </a>{" "}
    {` | `}
    <span>{props.comments}</span>
  </div>
);

export default LinkSubInfo;
