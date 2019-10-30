/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable radix */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import List from './list/List';
import './newslists.css';

class NewsLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      total: 0,
    };
  }

  componentDidMount() {
    const { lists, total } = this.props;
    this.setState({
      lists,
      total,
    });
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.page !== prevProps.page) {
      // eslint-disable-next-line react/no-did-update-set-state
      // eslint-disable-next-line react/destructuring-assignment
      this.setState({ lists: this.props.lists, total: this.props.total });
    }
  }

  /**
   * updating vote throught objectId
   * @param {*} id : objectId
   */
  upVote(id) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const data = [...this.state.lists];
    const index = data.findIndex(val => parseInt(val.objectID.trim()) === parseInt(id.trim()));
    const dataObj = data[index];
    dataObj.points += 1;
    data[index] = dataObj;
    this.setState({ lists: data });
  }

  /**
   * Remove object from list
   * @param {objectID} id
   */
  hideNews(id) {
    const data = [...this.state.lists];
    const index = data.findIndex(val => parseInt(val.objectID.trim()) === parseInt(id.trim()));
    data.splice(index, 1);
    const total = this.state.total - 1;
    this.setState({ lists: data, total });
  }

  render() {
    let lists = (<div className="loader">Loading...</div>);
    let more = (<div className="title" role="presentation" onClick={() => Router.push(`/?page=${this.props.page + 1}`)}>More</div>);

    if (this.state.total > 0) {
      // eslint-disable-next-line react/jsx-no-bind
      lists = this.state.lists.map((list, index) => (
        // eslint-disable-next-line max-len
        <List key={index} data={list} vote={() => this.upVote(list.objectID)} hide={() => this.hideNews(list.objectID)} />));
    } else if (this.state.total === 0) {
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      more = (<div className="title" onClick={() => Router.push('/?page=0')}>Go Back</div>);
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
    );
  }
}

NewsLists.defaultProps = {
  lists: [],
  total: 0,
};

NewsLists.propTypes = {
  lists: PropTypes.array,
  total: PropTypes.number,
};

export default NewsLists;
