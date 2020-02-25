import React from "react";
import styles from "../../components/Footer/Footer.module.css";

const Footer = () => {
  return (
    <>
      <center>
        <span> Applications are open for YC Summer 2020 </span>{" "}
      </center>{" "}
      <center>
        <span className={styles.yclinks}>
          <a href="newsguidelines.html"> Guidelines </a>|{" "}
          <a href="FAQ"> FAQ </a>| <a href="Support">Support </a> |{" "}
          <a href="API"> API </a>| <a href="Security">Security </a> |{" "}
          <a href="Bookmarklet"> Lists </a>|{" "}
          <a href="Bookmarklet">Bookmarklet </a> | <a href="Legal"> Legal </a>|{" "}
          <a href="Apply">Apply to YC </a> | <a href="Contact"> Contact </a>{" "}
        </span>{" "}
      </center>{" "}
    </>
  );
};

export default Footer;
