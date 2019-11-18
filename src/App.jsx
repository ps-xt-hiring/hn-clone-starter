import React, { Fragment } from 'react';
import News from './components/News';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stories: [],
      page: 0,
    };
    this.more = 'more';
  }

  componentDidMount(){
    this.fetchStories(0);
  }

  // FETCH STORIES
  fetchStories = async (page) => {
    let { more } = 'more';
    try{
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`,
      );
  
      const data = await response.json();
      let pageNumber = page + 1;
  
      if (!data.hits.length) {
        pageNumber = 0;
        this.more = 'Go Back';
      }
      else {
        this.more = 'more';
      }
      this.setState({
        stories: data.hits,
        loading: false,
        page: pageNumber,
        more,
      });
    }catch(err){
      console.log(err);
    }
  };

  validateList = (objectID) => {
    if (localStorage.getItem('hideStories')) {
      const objectIds = JSON.parse(localStorage.getItem('hideStories'));
      if (objectIds.indexOf(objectID) !== -1) {
        return false;
      }
    }

    return true;
  };

  // HIDE STORY
  hideEvent = (objectID, index) => {
    const { stories } = this.state;
    const copyStories = [...stories];
    copyStories.splice(index, 1);
    let objectIds = [];
    if (localStorage.getItem('hideStories')) {
      objectIds = JSON.parse(localStorage.getItem('hideStories'));
    }

    if (objectIds.length) {
      objectIds.push(objectID);
    } else {
      objectIds = [objectID];
    }
    localStorage.setItem('hideStories', JSON.stringify(objectIds));
    this.setState({
      stories: copyStories,
    });
  };

  // UPVOTE POINTS ON CLICK
  upvoteClick = (index) => {
    // 1.Copy the story
    const { stories } = this.state;
    const copyStories = [...stories];

    // 2.either add to the key or update the number of the key
    const dataobj = copyStories[index];
    dataobj.points += 1;
    copyStories[index] = dataobj;

    // 3.Update State
    this.setState({
      stories: copyStories,
    });
  };

  render() {
    const {
      loading, stories, page,
    } = this.state;
    return (
      <Fragment>
        <ul className="header">
          <li>
            <a href="/#" rel="" target="_blank">logo</a>
          </li>
          <li className="active">top</li>
          <li>new</li>
        </ul>
        <div className="post_container">
          <h1 className="nomore">No More Records !!!</h1>
          <ul className="news_list">
            {loading ? (
              <div>...Loading</div>
            ) : (
              Object.keys(stories).map((news, index) => {
                if (this.validateList(stories[index].objectID)) {
                  return (
                    <News
                      objectID={stories[index].objectID}
                      key={stories[index].objectID}
                      index={index}
                      details={stories[index]}
                      hide={() => this.hideEvent(stories[index].objectID, index)
                        }
                      upvoteClicked={() => this.upvoteClick(index)}
                    />
                  );
                }
                return '';
              })
            )}
          </ul>
          <button
            type="button"
            className="more"
            onClick={this.fetchStories.bind(this, page)}
          >
            {this.more}
          </button>
        </div>
      </Fragment>
    );
  }
}
export default App;
