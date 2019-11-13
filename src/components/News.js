import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { getUrl, redirectUrl } from "../helpers";

class News extends React.Component {
  render() {
    const {
      num_comments: comments,
      points: upvote,
      title,
      url,
      author,
      created_at
    } = this.props.details;
    let isGreater;
    if (upvote > 50 && upvote < 100) {
      isGreater = "cherry";
    } else if (upvote > 100) {
      isGreater = "orange";
    } else {
      isGreater = "";
    }

    return (
      <li className="news-detail">
        <div className="detail1">
          <span className="comments">{comments}</span>
          <span className="upvote" id={isGreater}>
            {upvote}
            <span className="up" onClick={this.props.upvoteClicked} />
          </span>
        </div>
        <div className="detail2">
          <span className="title">{title}</span>
          <a className="url" href={redirectUrl(getUrl(url))} target="new">
            <span className="sitestr">



              (
<span>{getUrl(url)}</span>


              )
</span>
          </a>
          <span className="by blackClr">



            by
<span className="author">{author}</span>
          </span>
          <span className="time">{moment(created_at).fromNow()}</span>
          <span onClick={this.props.delete} className="hide">



            [
<button type="button">hide</button>


            ]
</span>
        </div>
      </li>
    );
  }
}

News.defaultProps = {
  num_comments: `"`,
  points: null,
  title: `"`,
  url: `"`,
  author: `"`,
  created_at: `"`
};
News.propTypes = {
  num_comments: PropTypes.string,
  points: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  created_at: PropTypes.string
};
export default News;
