import React, { PropTypes, context } from 'react';
import { connect } from 'react-redux';


class NewsPage extends React.Component {

    constructor(props) {
        super(props, context);
        this.state = {
        };

    }
    render() {

        return (
            <div className="container">
                <div className="jumbotrom">
                    <h1 className="text-center"> News </h1>

                    <p>News page shall come over here......... </p>


                </div>

            </div>

        );
    }


}

function mapStateToProps(state, ownProps) {
    console.log("News Status", state);
    return {

        news: state.news.news
    };

}
export default connect(mapStateToProps)(NewsPage);





