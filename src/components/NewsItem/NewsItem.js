// component to render news with metadata

import React from "react";
import Span from "../Span/Span";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stalenessOfNews } from "../../utility/appUtility";
import Button from "../Button/Button";
import Anchor from "../Anchor/Anchor";
import { labelConstants } from "../../static/constants";
import "./NewsItem.scss";

function NewsItem(props) {
  const { news, upvote, hideNews } = props;
  return (
    <div className="row" key={news.objectID}>
      <Span news={news}>
        <strong>{news.num_comments}</strong>
      </Span>
      <Span>
        <strong>{news.points + " "}</strong>
        <Button news={news} onClick={upvote} title="Upvote">
          <FontAwesomeIcon id={news.objectID} icon={faCaretUp} />
        </Button>
      </Span>
      <div className="description">
        <div>
          <Anchor news={news} ariaLabel="Title of this news" target="_blank">
            <strong>{news.title + " "}</strong>
          </Anchor>
          <Anchor news={news} ariaLabel="Url of this news" target="_blank">
            <b>{"( " + (news.url && news.url.split("/")[2]) + " ) "}</b>
          </Anchor>
        </div>
        <div>
          <small>{" " + labelConstants.BY + " "}</small>
          <Anchor news={news} ariaLabel="Author of this news" target="_blank">
            <strong>{news.author}</strong>
          </Anchor>
          <b>{" " + stalenessOfNews(news) + " "}</b>
          <Button news={news} onClick={hideNews}>
            <small>{"[ "}</small>
            <strong id={news.objectID} title="hide">
              {labelConstants.HIDE}
            </strong>
            <small>{" ]"}</small>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NewsItem;
