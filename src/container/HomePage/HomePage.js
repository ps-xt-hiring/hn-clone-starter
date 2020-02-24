import React, { Component } from "react";
import NewsPage from "../../components/NewsPage/NewsPage";
import httpInstance from "../../axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./HomePage.module.css";
import SeeMore from "../../components/SeeMore/SeeMore";

export class HomePage extends Component {
  state = {
    data: [],
    currentPage: 0,
    voteArray: localStorage.getItem("voteArray")
      ? JSON.parse(localStorage.getItem("voteArray"))
      : [],
    error: false,
    errormessage: "Error Loading data ..."
  };

  componentDidMount() {
    // api call to get data for hacker news
    httpInstance
      .get("search?tags=front_page")
      .then(response => {
        //console.log(response);
        this.setState({ data: response });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  diffCalculator = (dt2, dt1) => {
    // function to calculate time difference
    let diffmin = (dt2.getTime() - dt1.getTime()) / 1000;
    diffmin /= 60;
    return Math.abs(Math.round(diffmin));
  };

  pageChange = () => {
    // function to load next page news list
    const currentpage = this.state.currentPage + 1;
    this.setState({ currentPage: currentpage });
    httpInstance
      .get("search?page=" + currentpage)
      .then(response => {
        console.log(response);
        this.setState({ data: response });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  hideRow = val => {
    //  function to hide news list
    let item = this.state.data.data.hits;
    console.log("===val", val);
    const deleteItem = item.filter(data => {
      //console.log(data.objectID, val);
      return data.objectID !== val;
     
    });
    let items = this.state.data;
    items.data.hits = deleteItem;
    console.log("==deleteItem",deleteItem);
    console.log("===items.data.hits", items.data.hits);
    console.log("===items", items);
    this.setState({ data: items });
  };

  vote = val => {
    // function setting the vote object ID in local storage
    let voteitem = this.state.voteArray;
    voteitem.push(val);
    this.setState({ voteArray: voteitem });
    localStorage.setItem("voteArray", JSON.stringify(voteitem));
  };

  upvote = val => {
    // function filtering the object ID and updating in local storage
    let voteitem = this.state.voteArray;
    const upvoteItem = voteitem.filter(upvo => upvo !== val);
    this.setState({ voteArray: upvoteItem });
    localStorage.setItem("voteArray", JSON.stringify(upvoteItem));
  };
  render() {
    return (
      <>
        <div className={styles.outerDiv}>
          <Header />
          {!this.state.error ? (
            <>
              <NewsPage
                upvote={this.upvote}
                voteItem={this.state.voteArray}
                data={this.state.data.data}
                vote={this.vote}
                index={this.state.currentPage}
                hideRow={this.hideRow}
                diffCalculator={this.diffCalculator}
              />
              <SeeMore pageChange={this.pageChange} />
            </>
          ) : (
            <center>
              <div className={styles.errorMessage}>
                <h2>{this.state.errormessage}</h2>
              </div>
            </center>
          )}

          <div className={styles.footerDiv}></div>

          <br />
          <Footer />
        </div>
      </>
    );
  }
}

export default HomePage;
