import React from 'react';
import PropTypes from 'prop-types';
import './ContentTable.css';
import CommentCount from './commentCount';
import UpvotesCount from './upvotesCount';
import UpvoteAction from './upvoteAction';
import Title from './title';
import DomainLink from './domainLink';
import Username from './username';
import PostTime from './postTime';
import Hide from './hide';


class ContentTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      waitingText: 'Loading...',
    };
  }

  componentDidMount() {
    this.dataFetch();
  }

  componentDidUpdate(prevProps) {
    const { pageNumber, tab } = this.props;
    if (pageNumber !== prevProps.pageNumber || tab !== prevProps.tab) {
      this.dataFetch();
    }
  }

  dataFetch = () => {
    this.setState({ waitingText: 'Loading...' });
    const { pageNumber, tab } = this.props;
    fetch(`https://hn.algolia.com/api/v1/search?tags=${tab}&page=${pageNumber}&hitsPerPage=30`, {
      method: 'get',
    })
      .then(
        (response) => {
          if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status Code: ${
              response.status}`);
            return;
          }
          // Examine the text in the response
          response.json().then(val => this.setState({ data: val.hits, waitingText: 'No Record Found' }));
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  };

  voteup = (objectID) => {
    const { data } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      if (objectID === data[i].objectID) {
        const temp = [...data];
        temp[i].points += 1;
        this.setState({ data: temp });
        break;
      }
    }
  }

  hideRow = (objectID) => {
    const { data } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      if (objectID === data[i].objectID) {
        const temp = [...data];
        temp.splice(i, 1);
        this.setState({ data: temp });
        break;
      }
    }
  }

  render() {
    const { waitingText, data } = this.state;
    const rowData = (data.length === 0
      ? <h2>{waitingText}</h2>
      : data.map(val => (
        <div className="row-layout" key={val.objectID}>
          <CommentCount count={val.num_comments} />
          <UpvotesCount upvotesCount={val.points} />
          <UpvoteAction voteUp={this.voteup} objectID={val.objectID} />
          <Title label={val.title} />
          <DomainLink url={val.url} />
          <Username author={val.author} />
          <PostTime postTime={val.created_at} />
          <Hide hideAction={this.hideRow} objectID={val.objectID} />
        </div>
      )));
    return (
      rowData
    );
  }
}

ContentTable.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  tab: PropTypes.string.isRequired,
};

export default ContentTable;
