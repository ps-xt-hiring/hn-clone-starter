import './App.css';
import * as newsActions from './actions/newsActions';
import React, { propTypes } from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(newsActions.newsFetchRequest());
    }
    render() {
        const { news: newsItem } = this.props;
        return (
            <div className="">
                <p onClick={() => this.forceUpdate()}>News will come over here...</p>
                {
                    newsItem.map((item) => {
                        return <p>{item.title}</p>
                    })
                }
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
