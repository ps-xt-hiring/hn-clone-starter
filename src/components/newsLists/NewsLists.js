import React, { Component } from 'react';
import Router from 'next/router';
import List from './list/List';
import './newslists.css';

class NewsLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: null
    }
  }

  render() {
    let lists = (<div>Loading...</div>);
    let more = (<div className="title" onClick={() => Router.push(`/?page=${this.props.page + 1}`)}>More</div>);

    if (this.props.total > 0) {
      lists = this.props.lists.map((list, index) => {
        return (<List key={index} data={list} />);
      })
    } else if (this.props.total === 0) {
      more = (<div className="title" onClick={() => Router.push(`/?page=0`)}>Go Back</div>);
      lists = (
        <div className="row no-margin list-loader">
          <div className="col">
            <p className="text-center text-danger font-weight-bold">No Records!</p>
          </div>
        </div>
      );
    }

    return (
      <section className="list-container">
        {lists}
        <div className="row no-margin list-loader">
          <div className="col offset-md-2">
            <div className="row">
              {more}
            </div>
          </div>
        </div>
      </section>
    )
  }

}


export default NewsLists;