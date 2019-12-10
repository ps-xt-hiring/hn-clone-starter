/* eslint-disable import/no-webpack-loader-syntax,   import/first*/
import './App.scss';
import * as newsActions from './actions/newsActions';
import NewsComponent from './components/NewsComponent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./components/news.scss";
import LoaderComponent from './components/LoaderComponents';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  logo from './assets/images/y18.gif';

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
    renderTableData = (items) => (

        <div className="table-responsive">
            <div className="header-section">
                <img src={logo} alt="Hacker Rank News Feeds" />
                <p className="white">top </p>
                <p>|</p>
                <p>new</p>

            </div>
            {this.props.loading ? <LoaderComponent /> : ""}

            <table className="table">

                <tbody>
                    {this.renderTableRows(items)}
                </tbody>
            </table>
        </div>

    );
    showMoreData = (pageNumber) => {

        this.props.dispatch(newsActions.newsFetchRequest(pageNumber));
    }
    gotoFirstPage = () => {
        this.props.dispatch(newsActions.newsFetchRequest(1));
    }
    hideMe = (objectId) => {
        let hide_id = [];
        let ids = JSON.parse(localStorage.getItem("hiddenIds"));

        if (ids === null) {
            hide_id.push(objectId);
        }
        if (ids !== null) {
            ids.push(objectId);
            hide_id = ids;
        }
        localStorage.setItem('hiddenIds', JSON.stringify(hide_id));
        this.props.dispatch(newsActions.hideItemRequest(hide_id));
    }
    handleUpVote = (objectId) => {

        let upvoted_news_id = [];
        let upvoteIds = JSON.parse(localStorage.getItem("upvotedIds"));
        if (upvoteIds === null) {
            upvoted_news_id.push(objectId);
        }
        if (upvoteIds && upvoteIds.includes(objectId)) {
            alert("Already Upvoted. ");

            return;
        }
        if (upvoteIds !== null) {
            upvoteIds.push(objectId);
            upvoted_news_id = upvoteIds;
        }
        localStorage.setItem('upvotedIds', JSON.stringify(upvoted_news_id));
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
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="main-container">


                            {this.renderTableData(newsItem)}

                            {<>
                                <button className="link-button more-link" onClick={() => this.showMoreData(pageNumber)}>More</button>
                                {(pageNumber !== 2 ? <button className="link-button first-page-link" onClick={() => this.gotoFirstPage(1)}>First Page</button> : '')}   </>}
                        </div>
                    </div>
                    <div className="col-md-2"></div>
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
