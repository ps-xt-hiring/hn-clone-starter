/* eslint-disable import/no-webpack-loader-syntax,   import/first*/
import './App.scss';
import * as newsActions from './actions/newsActions';
import NewsComponent from './components/NewsComponent';

import "./components/news.scss";
import LoaderComponent from './components/LoaderComponents';
import Button from './components/Button';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {hideMe, handleUpVote} from './common/utils';
import logo from './assets/images/y18.gif';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(newsActions.newsFetchRequest());
    }

    renderTableRows = (items) => {

        return (

            items.map((item) => {
                let isLiked = this.handleAlreadyVoted(item.objectID);
                return (
                    <NewsComponent
                        key={Math.random()}
                        isLiked={isLiked ? "yes" : ''}
                        hideMe={(id) => this.hideMe(id)}
                        handleUpVote={(id) => this.handleUpVote(id)}
                        item={item} />
                )

            })

        );


    }
    renderTableData = (items) => {
        const { loading } = this.props;
        return (
            <div className="table-responsive">
                <div className="header-section">
                    <img src={logo} alt="Hacker Rank News Feeds" />
                    <p className="white">top </p>
                    <p>|</p>
                    <p>new</p>

                </div>
              
                { loading ? <LoaderComponent /> : null}

                <table className="table">

                    <tbody>
                        {items  ? this.renderTableRows(items) : null}
                    </tbody>
                </table>
            </div>
        );
    }

    showMoreData = (pageNumber) => {

        this.props.dispatch(newsActions.newsFetchRequest(pageNumber));
    }
    gotoFirstPage = () => {
        this.props.dispatch(newsActions.newsFetchRequest(1));
    }
    hideMe = (objectId) => {
        let hide_id= hideMe(objectId)
        this.props.dispatch(newsActions.hideItemRequest(hide_id));
    }
    handleUpVote = (objectId) => {

     
        let upvoted_news_id= handleUpVote(objectId);
        this.props.dispatch(newsActions.upvoteNewsItem(upvoted_news_id, objectId));

    }
    handleAlreadyVoted = (objectId) => {
        let upvoteIds = JSON.parse(localStorage.getItem("upvotedIds"));
        if (upvoteIds && upvoteIds.includes(objectId)) {


            return true;
        }

    }
    render() {
        const { news: newsItem, pageNumber } = this.props;
        return (
            <div className="container">
                <div className="row">

                    <div className="col-md-8 col-md-offset-2">
                        <div className="main-container">


                            {this.renderTableData(newsItem)}

                            {<>
                            <Button
                                 text={"More"}
                                 className={"link-button more-link"}
                                 pageNumber={pageNumber}
                                 onClick={()=>this.showMoreData(pageNumber)}
                                  />

                                {(pageNumber !== 2 ?  <Button
                                 text={"First Page"}
                                 className={"link-button first-page-link"}
                                 pageNumber={pageNumber}
                                 onClick={()=>this.gotoFirstPage(1)}
                                  /> : '')}   </>}
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    news: PropTypes.array.isRequired,
    pageNumber: PropTypes.number.isRequired,
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        news: state.appData.news,
        pageNumber: state.appData.pageNumber,
        loading: state.appData.loading
    };

}
export default connect(mapStateToProps)(App);
