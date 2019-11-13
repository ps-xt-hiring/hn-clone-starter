import React, { Component } from 'react';
import { connect } from  'react-redux';
import { fetchProducts, hideItems, upVoteItems } from '../../redux/action';
import Listing from './listing';
import ListHeader from '../Header/header';

class ListingUI extends Component{
  componentDidMount(){
    let page = this.props.productReducer.pagination;
    this.props.fetchProducts(page);
  }

  ShowMoreItems = () => {
    // console.log(this.props);
    let page = this.props.productReducer.pagination;
    page++;
    this.props.history.push('/news?page=' + page);
    this.props.fetchProducts(page);
  };

  hideItem = objId => {
    this.props.hideItems(objId, this.props.productReducer.items);
  };

  upVote = objId => {
    this.props.upVoteItems(objId, this.props.productReducer.items);
  };

  render() {
    return (
      <React.Fragment>
        <ListHeader />
        <Listing
          productData={this.props.productReducer.items}
          hideItems={item => this.hideItem(item)}
          upVote={item => this.upVote(item)}
        />

        <span className="loadMoreItems" onClick={this.ShowMoreItems}>
          More
        </span>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    productReducer: state.productReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: page => dispatch(fetchProducts(page)),
    hideItems: (objId, item) => dispatch(hideItems(objId, item)),
    upVoteItems: (objId, item) => dispatch(upVoteItems(objId, item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingUI);
