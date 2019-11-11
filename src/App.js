import './App.css';
import * as newsActions from './actions/newsActions';
import React, { propTypes } from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    componentWillMount() {
        console.log("Lets make a api call here.... ");
        this.props.dispatch(newsActions.newsFetchRequest());
    }

    render() {
        console.log("recd news", this.props.news[0]);
        let newsObject = Object.values(this.props.news[0]);
        console.log("aa", newsObject);
        return (
            <div className="">
                <p onClick={() => this.forceUpdate()}>News will come over here...</p>
                {newsObject ? (newsObject.map((item) => {

                    return <div key={Math.random()}> aa {item.title}</div>
                }




                )) : ""}



            </div>


        );
    }
}
App.propTypes = {

};

function mapStateToProps(state, ownProps) {
    console.log("News Item recd", state, typeof state);
    console.log("News Item recd", state.news.news);
    return {
        news: state.news.news
    };

}




export default connect(mapStateToProps)(App);
