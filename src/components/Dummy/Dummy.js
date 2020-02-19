import React from "react";
import ReactDOM from "react-dom";
import "./Dummy.css";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class News extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("sansvasvans", localStorage.getItem("hits"));
    return (
      <div className="container">
        <div className="row">
          <span className="comments"> <strong>203</strong></span>
          <span className="upvotes">
            {"450 "}
            <a href="#">
              <FontAwesomeIcon icon={faCaretUp} />
            </a>
          </span>
          <div className="description">
            <a href={"https://google.co.in"}>
              <strong>{" Let us check this out "}</strong>
            </a>
            <a  style={{opacity:0.5}} href={"https://google.co.in"}>
              <strong>{"(https://google.co.in)"}</strong>
            </a>
            <small style={{opacity:0.4}}>{" by "}</small>
            <a href="#"><strong>Some Guy</strong></a>{" "}
            <a href="#" onClick={this.hideNews}>
              <strong>{" [ hide ] "}</strong>
            </a>
          </div>
        </div>
        <div className="row">
          <span className="comments"> <strong>23</strong></span>
          <span className="upvotes">
            {"45 "}
            <a href="#">
              <FontAwesomeIcon icon={faCaretUp} />
            </a>
          </span>
          <div className="description">
            <a href={"https://google.co.in"}>
              <strong>{" Let us check this out "}</strong>
            </a>
            <a  style={{opacity:0.5}} href={"https://google.co.in"}>
              <strong>{"(https://google.co.in)"}</strong>
            </a>
            <small style={{opacity:0.4}}>{" by "}</small>
            <a href="#"><strong>Some Guy</strong></a>{" "}
            <a href="#" onClick={this.hideNews}>
              <strong>{" [ hide ] "}</strong>
            </a>
          </div>
        </div>
        <div className="row">
          <span className="comments"> <strong>23</strong></span>
          <span className="upvotes">
            {"45 "}
            <a href="#">
              <FontAwesomeIcon icon={faCaretUp} />
            </a>
          </span>
          <div className="description">
            <a href={"https://google.co.in"}>
              <strong>{" Let us check this out "}</strong>
            </a>
            <a  style={{opacity:0.5}} href={"https://google.co.in"}>
              <strong>{"(https://google.co.in)"}</strong>
            </a>
            <small style={{opacity:0.4}}>{" by "}</small>
            <a href="#"><strong>Some Guy</strong></a>{" "}
            <a href="#" onClick={this.hideNews}>
              <strong>{" [ hide ] "}</strong>
            </a>
          </div>
        </div>
        <div className="row">
          <span className="comments"> <strong>23</strong></span>
          <span className="upvotes">
            {"45 "}
            <a href="#">
              <FontAwesomeIcon icon={faCaretUp} />
            </a>
          </span>
          <div className="description">
            <a href={"https://google.co.in"}>
              <strong>{" Let us check this out "}</strong>
            </a>
            <a  style={{opacity:0.5}} href={"https://google.co.in"}>
              <strong>{"(https://google.co.in)"}</strong>
            </a>
            <small style={{opacity:0.4}}>{" by "}</small>
            <a href="#"><strong>Some Guy</strong></a>{" "}
            <a href="#" onClick={this.hideNews}>
              <small style={{opacity:0.6}}>{"[ "}</small> <strong>{" hide "}</strong> <small style={{opacity:0.6}}>{" ]"}</small>
            </a>
          </div>
        </div>
        <footer>
          <a href="#" onClick={this.moreNews}>
            More
          </a>
        </footer>
      </div>
    );
  }
}
