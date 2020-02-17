import React from "react";
import styles from "./Header.module.css";
import LogoIcon from "../../assests/images/y18.gif";
export default function FeedHeader(props) {
  const { categories, getNewsFeeds } = props;
  return (
    <header className={styles.feedHeader}>
      <img className={styles.logo} alt="logo" src={LogoIcon} />

      <ul data-testid="navigation">
        {categories.map((category, index) => (
          <li data-testid="navigationItem" tabIndex={index}
            onClick={() => getNewsFeeds(category)}
            className={category.active ? styles.activeItem : ""}
            key={category.id}
          >
            {category.key}
          </li>
        ))}
      </ul>
    </header>
  );
}
