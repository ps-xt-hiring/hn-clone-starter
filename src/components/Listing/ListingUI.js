import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProducts, hideItems, upVoteItems } from '../../redux/action';
import Listing from './listing';
import ListHeader from '../Header/header';

class ListingUI extends Component {
  componentDidMount() {
    const { productReducer, fetchProductsAction } = this.props;
    const page = productReducer.pagination;
    fetchProductsAction(page);
  }

  ShowMoreItems = () => {
    const { productReducer, history, fetchProductsAction } = this.props;
    const page = productReducer.pagination + 1;
    history.push(`/news?page=${page}`);
    fetchProductsAction(page);
  };

  hideItem = (objId) => {
    const { hideItemsAction, productReducer } = this.props;
    hideItemsAction(objId, productReducer.items);
  };

  upVote = (objId) => {
    const { upVoteItemsAction, productReducer } = this.props;
    upVoteItemsAction(objId, productReducer.items);
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
  fetchProductsAction: page => dispatch(fetchProducts(page)),
  hideItemsAction: (objId, item) => dispatch(hideItems(objId, item)),
  upVoteItemsAction: (objId, item) => dispatch(upVoteItems(objId, item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingUI);


ListingUI.propTypes = {
  productReducer: PropTypes.oneOfType([PropTypes.array]).isRequired,
  hideItemsAction: PropTypes.func.isRequired,
  upVoteItemsAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchProductsAction: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
