import React, {Component} from 'react';
import axios from 'axios';

import NewsItem from '../components/NewsItem/NewsItem';
import withStyles from '../hoc/withStyles';
import styles from './NewsList.style'

class newsList extends Component {
    
    constructor (props) {
        super (props)
        this.state = {
            news: [],
            pageNumber: 1
        }
    };
    
    componentDidMount (){
        axios.get(`https://hn.algolia.com/api/v1/search?page=${this.state.pageNumber}`)
            .then((res) => {
                this.setState({news: res.data.hits})
                console.log(this.state.news);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageNumber !== this.state.pageNumber) {
            axios.get(`https://hn.algolia.com/api/v1/search?page=${this.state.pageNumber}`)
            .then((res) => {
                this.setState({ news : res.data.hits});
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    loadMore = () => {
        this.setState((state, props) => {
            return {pageNumber: state.pageNumber + 1};
        });
    };    

    render() {
        const {className} = this.props;
        return (
            <div className = {className}>
                <ul>
                    {this.state.news.map((list, index) => <NewsItem 
                                                        list = {list} 
                                                    />)}
                </ul>
                <button type="button" className="more" onClick={this.loadMore}>More</button>
            </div>
        )
    };

}

export default withStyles (newsList, styles);

