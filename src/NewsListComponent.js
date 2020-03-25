import React, { Component } from 'react';
import axios from 'axios'
import './NewsListComponent.css';
import ResponsiveTable from './ResponsiveTable'

class NewsListComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newsList:[]
        }
        
    }
    async componentDidMount() {
        const {data} = await axios.get('https://hn.algolia.com/api/v1/search')
        data.hits.map(o => o.upvote_count = 0)
        this.setState({newsList: data.hits})
        console.log("state",this.state.newsList)
    }
    
    render() {
        var cols = {
            num_comments: 'No of comments',
            upvote_count:'Upvotes',
            upvote:'upvote',
            title: 'Title',
            url: 'URL',
            author: 'Author',
            created_at_i:'Created at'
        }
        return (
            <div className="NewsList">
                <ResponsiveTable columns={cols} rows={this.state.newsList} />
                <a href="#">More</a>
            </div>
        );
    }
}

export default NewsListComponent;