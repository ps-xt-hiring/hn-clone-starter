import React, { Component, Fragment } from "react";
import { fetchStoryList } from "../../actions/storylist-action";
import { connect } from "react-redux";
import "./StoryList.scss";

class StoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyItems: [],
      pageNo: 1,
      list: props.list,
      hiddenArr: [],
      upvotesArr: []
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let items = [...prevState.storyItems];
    if (
      Object.keys(nextProps.list).length !== 0 &&
      nextProps.list !== prevState.list
    ) {
      const hiddenIds = localStorage.getItem("hiddenItems") || [];
      const upvotesIds = localStorage.getItem("upvotesItems") || [];
      nextProps.list.hits.forEach(el => {
        if (!hiddenIds.includes(el.objectID)) {
          return items.push({
            comments: el.num_comments,
            author: el.author,
            title: el.title,
            link: el.url,
            createdAt: el.created_at,
            hits: el.points,
            id: el.objectID,
            upvote: upvotesIds.includes(el.objectID) ? true : false
          });
        }
      });
      return {
        storyItems: items,
        list: nextProps.list
      };
    }
    return null;
  };

  handleClickMore = () => {
    this.setState(
      prevState => ({
        pageNo: prevState.pageNo + 1
      }),
      () => {
        this.props.fetchStoryList(this.state.pageNo + 1);
      }
    );
  };

  handleUpvote = itemId => {
    this.setState(
      prevState => {
        prevState.storyItems.forEach(el => {
          if (el.id === itemId) {
            el.upvote ? (el.hits = el.hits - 1) : (el.hits = el.hits + 1);
            el.upvote = !el.upvote;
          }
        });
        if (prevState.upvotesArr.includes(itemId)) {
          const index = prevState.upvotesArr.indexOf(itemId);
          prevState.upvotesArr.splice(index, 1);
        } else {
          prevState.upvotesArr.push(itemId);
        }

        return {
          storyItems: prevState.storyItems,
          upvotesArr: prevState.upvotesArr
        };
      },
      () => {
        localStorage.setItem("upvotesItems", this.state.upvotesArr);
      }
    );
  };

  handleHideButton = itemId => {
    this.setState(prevState => {
      const newItems = prevState.storyItems.filter(el => {
        if (el.id === itemId) {
          prevState.hiddenArr.push(String(itemId));
          localStorage.setItem("hiddenItems", prevState.hiddenArr);
        }
        return el.id !== itemId;
      });
      return {
        storyItems: newItems,
        hiddenArr: prevState.hiddenArr
      };
    });
  };

  render() {
    return (
      <div className="listContainer">
        {Object.keys(this.state.list).length !== 0 ? (
          <Fragment>
            <ul>
              {this.state.storyItems.map((el, index) => (
                <li className={index % 2 && "even"} key={el.id}>
                  <span>{el.comments ? el.comments : "-"}</span>
                  <span>{el.hits}</span>
                  <a title="Upvote" onClick={() => this.handleUpvote(el.id)}>
                    {!el.upvote && "^"}
                  </a>
                  <div className="tableRow large">
                    {el.title ? el.title : "--title unavailable--"}
                  </div>
                  <a
                    href={el.link ? el.link : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tableRow sub"
                  >
                    (
                    {el.link
                      ? el.link.substring(0, 30)
                      : "--link unavailable--"}
                    )
                  </a>
                  <div className="tableRow small">by {el.author} </div>
                  <div className="tableRow small">{el.createdAt}</div>
                  <button onClick={() => this.handleHideButton(el.id)}>
                    [ hide ]
                  </button>
                  <button
                    className="tableRow small"
                    onClick={() => {
                      this.handleUpvote(el.id);
                    }}
                  >
                    {el.upvote && "unvote"}
                  </button>
                </li>
              ))}
            </ul>
            <div className="moreButton">
              <button onClick={this.handleClickMore}>More...</button>
            </div>
          </Fragment>
        ) : (
          <div className="fetchInfo">Fetching Data...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.storyList.list
});

const mapDispatchToProps = {
  fetchStoryList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryList);
