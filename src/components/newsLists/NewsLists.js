import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { getIntVal } from '../../utils/helpers';
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

  componentDidUpdate(prevProps) {
    const { page, lists, total } = this.props;
    const { page: prevPage } = prevProps;

    if (page !== prevPage) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ lists, total });
    }
  }

  /**
   * updating vote throught objectId
   * @param {*} id : objectId
   */
  upVote(id) {
    const { lists } = this.state;
    const data = [...lists];
    const index = data.findIndex(val => getIntVal(val.objectID.trim()) === getIntVal(id.trim()));
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
    const { lists, total } = this.state;
    const data = [...lists];
    const index = data.findIndex(val => getIntVal(val.objectID.trim()) === getIntVal(id.trim()));
    data.splice(index, 1);
    const totalList = total - 1;
    this.setState({ lists: data, total: totalList });
  }

  render() {
    const { total, lists } = this.state;
    const { page } = this.props;

    let newsList = (<div className="loader">Loading...</div>);
    let more = (<div className="title" role="presentation" onClick={() => Router.push(`/?page=${page + 1}`)}>More</div>);

    if (total > 0) {
      newsList = lists.map(list => (
        <List
          key={list.objectID}
          data={list}
          vote={() => this.upVote(list.objectID)}
          hide={() => this.hideNews(list.objectID)}
        />
      ));
    } else if (total === 0) {
      more = (<div className="title" role="link" tabIndex={0} onClick={() => Router.push('/?page=0')} onKeyPress={() => Router.push('/?page=0')}>Go Back</div>);
      newsList = (
        <div className="row no-margin list-loader">
          <div className="col">
            <p className="text-center text-danger font-weight-bold">No Records!</p>
          </div>
        </div>
      );
    }

    return (
      <section className="list-container">
        {newsList}
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
  page: 0,
};

NewsLists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
  page: PropTypes.number,
};

export default NewsLists;
