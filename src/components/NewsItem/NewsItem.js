import React from "react";
import Span from "../Span/Span";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stalenessOfNews } from "../../appUtility/utility";
import Button from "../Button/Button";
import Anchor from "../Anchor/Anchor";

function NewsItem(props) {
  const { news, upvote, hideNews } = props;
  return (
    <div className="row" key={news.objectID}>
      <Span news={news}>
        <strong>{news.num_comments}</strong>
      </Span>
      <Span>
        <strong>{news.points + " "}</strong>
        <Button news={news} onClick={upvote}>
          <FontAwesomeIcon id={news.objectID} icon={faCaretUp} />
        </Button>
      </Span>
      <div className="description">
        <div>
          <Anchor news={news} ariaLabel="Title of this news" target="_blank">
            <strong>{news.title + " "}</strong>
          </Anchor>
          <Anchor news={news} ariaLabel="Url of this news" target="_blank">
            <strong style={{ opacity: 0.5 }}>
              ({news.url && news.url.split("/")[2]})
            </strong>
          </Anchor>
        </div>
        <div>
          <small style={{ opacity: 0.4 }}>{" by "}</small>
          <Anchor news={news} ariaLabel="Author of this news" target="_blank">
            <strong>{news.author}</strong>
          </Anchor>
          <b style={{ opacity: 0.4 }}>{stalenessOfNews(news)}</b>
          <Button news={news} onClick={hideNews}>
            <small style={{ opacity: 0.4 }}>{"[ "}</small>
            <strong id={news.objectID} title="hide">
              {" hide "}
            </strong>
            <small style={{ opacity: 0.4 }}>{" ]"}</small>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NewsItem;
