import React from 'react';
import './ContentTable.css';
import CommentCount from './commentCount';
import UpvotesCount from './upvotesCount';
import UpvoteAction from './upvoteAction';
import Title from './title';
import DomainLink from './domainLink';
import Username from './username';
import PostTime from './postTime'
import Hide from './hide';


class ContentTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      waitingText: 'Loading...'
    }
  }
  dataFetch = () => {
    fetch(`https://hn.algolia.com/api/v1/search?tags=${this.props.tab}&page=${this.props.pageNumber}&hitsPerPage=30`, {
      method: 'get'
    })
      .then(
        response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(val => this.setState({ data: val.hits, waitingText: "No Record Found" }))
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  };

  componentDidMount() {
    this.dataFetch();
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.pageNumber !== prevProps.pageNumber || this.props.tab !== prevProps.tab){
      this.setState({waitingText: 'Loading...'});
      this.dataFetch();
    }
    
  }
  voteup = objectID => {
    for (let i in this.state.data) {
      if (objectID === this.state.data[i].objectID) {
        let temp = [...this.state.data];
        temp[i].points++;
        this.setState({ data: temp });
        break;
      }
    }
  }
  hideRow = objectID => {
    for (let i in this.state.data) {
      if (objectID === this.state.data[i].objectID) {
        let temp = [...this.state.data];
        temp.splice(i, 1);
        this.setState({ data: temp });
        break;
      }
    }
  }
  render() {
    const rowData = (this.state.data.length ===0 ? 
      <h2>{this.state.waitingText}</h2>
      :
      this.state.data.map((val, index) => {
      return (
        <div className="row-layout" key={index}>
          <CommentCount count={val.num_comments} />
          <UpvotesCount upvotesCount={val.points} />
          <UpvoteAction voteUp={this.voteup} objectID={val.objectID} />
          <Title label={val.title} />
          <DomainLink url={val.url} />
          <Username author={val.author} />
          <PostTime postTime={val.created_at} />
          <Hide hideAction={this.hideRow} objectID={val.objectID} />
        </div>
      )
    }))
    return (
      rowData
    )
  }
}

export default ContentTable;