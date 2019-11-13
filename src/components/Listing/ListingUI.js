import React, { Component } from "react";

import Listing from "./listing";
import { fetchProducts, hideItems, upWardItems } from '../../redux/action'
import { connect } from "react-redux";


class ListingUI extends Component {

    componentDidMount() {
        let page = this.props.productReducer.pagination;
        this.props.fetchProducts(page);
    }

   

    ShowMoreItems = () => {
        console.log(this.props)
        let page = this.props.productReducer.pagination;
        page++


        // this.props.addMoreItems(page)
        this.props.history.push('/news?page=' + page);
        this.props.fetchProducts(page)
    }


    hideItem = (objId) => {
            this.props.hideItems(objId, this.props.productReducer.items)
    }

    upWard = (objId) => {
        this.props.upWardItems(objId, this.props.productReducer.items)
    }


    render() {
       
        return (

            <React.Fragment>
                <Listing
                    productData={this.props.productReducer.items}
                    hideItems = {(item)=>this.hideItem(item)}
                    upWard = {(item) => this.upWard(item)}
                  



                />

                <span onClick={this.ShowMoreItems}>See MOre</span>


                

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
        fetchProducts: (page) => dispatch(fetchProducts(page)),
        hideItems: (objId, item) => dispatch(hideItems(objId, item)),
        upWardItems: (objId, item) => dispatch(upWardItems(objId, item)),

    };
};





export default connect(mapStateToProps, mapDispatchToProps)(ListingUI);