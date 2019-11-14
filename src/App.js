import './App.css';
import * as newsActions from './actions/newsActions';
import NewsComponent from './components/NewsComponent';
import React, { propTypes, Fragment } from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(newsActions.newsFetchRequest());
    }

    renderTableRows = (items) => {

        return (

            items.map((item) => {
                return (
                    <NewsComponent
                        key={Math.random()}
                        hideMe={(id) => this.hideMe(id)}
                        handleUpVote={(id) => this.handleUpVote(id)}
                        item={item} />
                )

            })

        );


    }
    renderTableData = (items) => (
        <div className="table-responsive">
            <table class="table">
                <tbody>
                    {this.renderTableRows(items)}
                </tbody>
            </table>
        </div>

    );
    showMoreData = (pageNumber) => {
        console.log("PageNumber_recd", pageNumber);
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
        console.log("Received Object ID", objectId);
        let upvoted_news_id = [];
        let upvoteIds = JSON.parse(localStorage.getItem("upvotedIds"));
        if (upvoteIds === null) {
            upvoted_news_id.push(objectId);
        }
        if (upvoteIds && upvoteIds.includes(objectId)) {

            return;
        }
        if (upvoteIds !== null) {
            upvoteIds.push(objectId);
            upvoted_news_id = upvoteIds;
        }
        localStorage.setItem('upvotedIds', JSON.stringify(upvoted_news_id));
        this.props.dispatch(newsActions.upvoteNewsItem(upvoted_news_id, objectId));

    }
    render() {
        const { news: newsItem, pageNumber } = this.props;
        return (
            <div className="">

                {this.renderTableData(newsItem)}

                {<>
                    <button onClick={() => this.showMoreData(pageNumber)}>More</button>
                    {(pageNumber !== 2 ? <button onClick={() => this.gotoFirstPage(1)}>First Page</button> : '')}   </>}
            </div>
        );
    }
}
App.propTypes = {

};

function mapStateToProps(state, ownProps) {
    return {
        news: state.appData.news,
        pageNumber: state.appData.pageNumber
    };

}
export default connect(mapStateToProps)(App);
