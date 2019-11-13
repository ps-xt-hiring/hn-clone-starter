import './App.css';
import * as newsActions from './actions/newsActions';
import NewsComponent from './components/NewsComponent';
import React, { propTypes } from 'react';
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


    render() {
        const { news: newsItem } = this.props;
        return (
            <div className="">
                {/* <p onClick={() => this.forceUpdate()}>News will come over here...</p> */}
                {/* {
                    newsItem.map((item) => {
                        return <p key={item.id}>{item.title}</p>
                    })
                } */}
                {this.renderTableData(newsItem)}
            </div>
        );
    }
}
App.propTypes = {

};

function mapStateToProps(state, ownProps) {
    return {
        news: state.appData.news,
        food: state.appData.food
    };

}
export default connect(mapStateToProps)(App);
