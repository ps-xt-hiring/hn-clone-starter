import React from "react";
import styles from "../SeeMore/SeeMore.module.css";

const SeeMore = props => { // function rendering more link to render next news list  
    const {pageChange} = props;
  return (
    <button className={styles.seeMoreBtn} onClick={pageChange}>
      More{" "}
    </button>
  );
};

export default SeeMore;
