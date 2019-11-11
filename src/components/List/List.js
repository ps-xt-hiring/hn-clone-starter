import React, { Component } from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

export default class List extends Component {
  constructor() {
    super();
    this.state = { list: [], currentPage: 0 };
    this.getData = this.getData.bind(this);
    this.hide = this.hide.bind(this);
    this.voteUpdate = this.voteUpdate.bind(this);
  }


  componentDidMount() {
    this.getData();
  }


  getData = () => {
    fetch(
      `http://hn.algolia.com/api/v1/search?tags=front_page&page=${this.state.currentPage}`,
      { method: 'get' },
    )
      .then(resp => resp.json())
      .then((data) => {
        this.setState(prevstate => ({
          list: prevstate.list.concat(data.hits),
          currentPage: prevstate.currentPage + 1,
        }));
      });
  };

  hide = (id) => {
    this.setState({
      list: this.state.list.map((a) => {
        if (a.objectID === id) a.hide = true;
        return a;
      }),
    });
  };

  voteUpdate = (id) => {
    this.setState({
      list: this.state.list.map((a) => {
        if (a.objectID === id) a.points += 1;
        return a;
      }),
    });
  };


  render() {
    return (
      <div className="table-responsive">
        <ListItem
          items={this.state.list}
          hide={this.hide}
          voteUpdate={this.voteUpdate}
        />
        <div className="shw-crsr" role="option" tabIndex="0" aria-selected="true" onClick={this.getData} onKeyPress={this.handleKeyPress}>More</div>
      </div>
    );
  }
}
