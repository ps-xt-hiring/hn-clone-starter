import React, { PureComponent } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { getUrl, redirectUrl } from "../helpers";

class News extends PureComponent {
  render() {
    const {
      details: {
        num_comments: comments,
        points: upvote,
        title,
        url,
        author,
        created_at: createdAt
      }
    } = this.props;
    let isGreater;
    if (upvote > 50 && upvote < 100) {
      isGreater = "cherry";
    } else if (upvote > 100) {
      isGreater = "orange";
    } else {
      isGreater = "";
    }
    const { upvoteClicked } = this.props;

    return (
      <li className="news-detail">
        <div className="detail1">
          <span className="comments">{comments}</span>
          <span className="upvote" id={isGreater}>
            {upvote}
            <span
              role="button"
              tabIndex="0"
              className="up"
              onKeyPress={upvoteClicked}
              onClick={() => upvoteClicked()}
            />
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
          <span className="time">{moment(createdAt).fromNow()}</span>
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
  details: {
    num_comments: null,
    points: null,
    title: "",
    url: "",
    author: "",
    created_at: ""
  },
  upvoteClicked: () => { }
};
News.propTypes = {
  details: PropTypes.shape({
    num_comments: PropTypes.number,
    points: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string,
    created_at: PropTypes.string
  }),
  upvoteClicked: PropTypes.func
};
export default News;
