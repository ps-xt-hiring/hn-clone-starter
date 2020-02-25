import React from "react";
import styles from "./NewsPage.module.css";

const newspage = props => {
  // component rendering the news list
  let NewsList;
  if (props.data) {
    //console.log("===hits", props.index, props.data.hits);
    const hits = props.data.hits;
    NewsList = hits.map((data, i) => {
      if ( data.url && data.created_at) {
        // console.log("=== i", i)
        let url = data.url;
        let domain = url
          .replace("http://", "")
          .replace("https://", "")
          .split(/[/?#]/)[0];

        let dt1 = new Date(data.created_at);
        let dt2 = new Date();
        let diff = props.diffCalculator(dt1, dt2);
        let diffDays = Math.round(diff / (24 * 60));

        return (
          <div className={styles.mainStyle} key={data.objectID}>
            <div className={styles.numberList}>
              {" "}
              {props.index < 1
                ? props.index + i + 1
                : props.index * 10 + 11 + i}
              .
              {props.voteItem.indexOf(data.objectID) < 0 ? (
                <span className={styles.listMargin}>
                  <img
                    onClick={() => props.vote(data.objectID)}
                    src={"https://news.ycombinator.com/grayarrow.gif"}
                    alt=""
                  ></img>
                </span>
              ) : (
                <div
                  className={styles.unvoteDiv}
                  onClick={() => props.upvote(data.objectID)}
                >
                  unvote |
                </div>
              )}
            </div>
            <div className={styles.titleFont}>
              {data.title} <span className={styles.titleURL}>({domain}) </span>
            </div>
            <br />
            <div className={styles.hideAlign}>
              <div className={styles.commentFont}>
                {data.points} points By {data.author} {" | "}{" "}
                {data.num_comments} comments {"| "} {diffDays} hours ago
              </div>
             
              <div
                className={styles.hideDiv}
                onClick={() => props.hideRow(data.objectID)}
              >
                <a href="#hide" className={styles.linkColor}>
                  | hide |
                </a>
              </div>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <>
      <div>{NewsList}</div>
    </>
  );
};

export default newspage;
