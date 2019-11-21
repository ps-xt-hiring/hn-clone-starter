import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, hideItems, upVoteItems } from '../../redux/action';
import Listing from './listing';
import ListHeader from '../Header/header';

class ListingUI extends Component {
  componentDidMount() {
    const { productReducer, fetchProducts } = this.props;
    const page = productReducer.pagination;
    fetchProducts(page);
  }

  ShowMoreItems = () => {
    const { productReducer, history, fetchProducts } = this.props;
    const page = productReducer.pagination + 1;
    history.push(`/news?page=${page}`);
    fetchProducts(page);
  };

  hideItem = (objId) => {
    const { hideItems, productReducer } = this.props;
    hideItems(objId, productReducer.items);
  };

  upVote = (objId) => {
    const { upVoteItems, productReducer } = this.props;
    upVoteItems(objId, productReducer.items);
  };

  render() {
    const { productReducer } = this.props;
    return (
      <React.Fragment>
        <ListHeader />
        <Listing
          productData={productReducer.items}
          hideItems={item => this.hideItem(item)}
          upVote={item => this.upVote(item)}
        />

        <button type="button" className="loadMoreItems" onClick={this.ShowMoreItems}>
           More
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  productReducer: state.productReducer,
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: page => dispatch(fetchProducts(page)),
  hideItems: (objId, item) => dispatch(hideItems(objId, item)),
  upVoteItems: (objId, item) => dispatch(upVoteItems(objId, item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingUI);
