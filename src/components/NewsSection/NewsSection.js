import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as newsBuilderActions from "../../store/actions/index";
import ListItemNews from "../ListItemNews/ListItemNews";
import "./NewsSection.css";

class NewsSection extends Component {
  componentDidMount() {
    this.props.onInitNewsItems();
  }

  handleUpvoteClick = itemId => {
    this.props.onUpvoteClick(itemId);
  };

  render() {
    return (
      <Fragment>
        <ul className="listItem">
          {this.props.items && this.props.items.length ? (
            this.props.items.map((itemsData, i) => {
              return (
                <ListItemNews
                  data={itemsData}
                  upVoteClick={itemId => this.handleUpvoteClick(itemId)}
                  hideListClick={itemId => this.props.onHideClick(itemId)}
                  key={i}
                ></ListItemNews>
              );
            })
          ) : (
            <p className="loading">
              {this.props.items && this.props.items.length === 0
                ? "You have reached end of news Items. No data available further"
                : "News Item data is loading"}
            </p>
          )}
        </ul>
        {this.props.items && this.props.items.length ? (
          <button
            className="loadMore"
            onClick={() => {
              this.props.onInitNewsItems(this.props.pageNumber);
            }}
          >
            More
          </button>
        ) : (
          <button
            className="gotoFirstPage"
            onClick={() => {
              this.props.onInitNewsItems();
            }}
          >
            {this.props.items && this.props.items.length === 0
              ? "Go to first Page"
              : null}
          </button>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.newsItems,
    pageNumber: state.pageNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitNewsItems: pageNumber =>
      dispatch(newsBuilderActions.initNewsItems(pageNumber || 0)),
    onUpvoteClick: itemId => dispatch(newsBuilderActions.upVoteClick(itemId)),
    onHideClick: itemId => dispatch(newsBuilderActions.hideListClick(itemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsSection);
