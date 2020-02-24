import React from "react";
import styles from "./Header.module.css";

function FrontPage() {
  // component rendering the header on the page
  return (
    <>
      <ul className={styles.mainDiv}>
        <li className={styles.lifrontPageImg}>
          <img
            className={styles.frontPageImg}
            src="https://news.ycombinator.com/y18.gif"
            alt=""
          />
        </li>
        <li>
          <a className="active" href="#Hacker news">
            <b>Hacker news</b>
          </a>
        </li>
        <li>
          <a className="active" href="#home">
            welcome |
          </a>
        </li>
        <li className={styles.liStyle}>
          <a href="#news">new |</a>
        </li>
        <li className={styles.liStyle}>
          <a href="#contact">threads |</a>
        </li>
        <li className={styles.liStyle}>
          <a href="#past">past |</a>
        </li>
        <li className={styles.liStyle}>
          <a href="#comments">comments |</a>
        </li>
        <li className={styles.liStyle}>
          <a href="#ask">ask |</a>
        </li>
        <li className={styles.liStyle}>
          <a href="#show">show |</a>
        </li>
        <li className={styles.liStyle}>
          <a href="#jobs">jobs |</a>
        </li>
        <li className={styles.liStylelast}>
          <a href="#login">login</a>
        </li>
      </ul>
    </>
  );
}

export default FrontPage;
