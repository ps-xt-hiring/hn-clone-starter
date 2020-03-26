import React from "react";
import styles from "./Button.module.css";
/**
 * Basic Button Component
 *
 * @param {*} {
 *  clickHandler : ()=>{},
 *  text : String,
 *  type = "button"
 * }
 */
const Button = ({ clickHandler, text, type = "button" }) => (
  <button className={styles.btn} type={type} onClick={clickHandler}>
    {text}
  </button>
);

export default Button;
