import React, { Component } from 'react';
import axios from 'axios'
import './NewsListComponent.css';
import ResponsiveTable from './ResponsiveTable'

class NewsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList:[],
            hiddenListArray:[],
            currentPage:1
        }
    }
    async loadMore () {
        let iCurrentPage = this.state.currentPage;
        iCurrentPage++;
        this.setState({currentPage:iCurrentPage})
        const {data} = await axios.get(`https://api.myjson.com/bins/x3eng`)
        let newsList = [...this.state.newsList,...data.hits]
        this.setState({newsList:newsList})
    }
    vote (i) {
		let newCountedArray = [...this.state.newsList]
        newCountedArray[i].upvote_count++;
        this.setState({newsList:newCountedArray})
    }
    hide (index,item) {
        let newHiddenRowList = [...this.state.newsList]
        this.state.hiddenListArray.push(item)
        newHiddenRowList.splice(index,1)
        localStorage.setItem("hiddenListArray",JSON.stringify(this.state.hiddenListArray))
        this.setState({newsList:newHiddenRowList})
    }
    async componentDidMount() {
        const {data} = await axios.get('https://hn.algolia.com/api/v1/search')
        let hiddenItems = JSON.parse(localStorage.getItem("hiddenListArray"))
        if(hiddenItems){
            let objIdsArr=[];
            for(let i=0;i<hiddenItems.length;i++){
                objIdsArr.push(hiddenItems[i].objectID)
            }
            let result;
            for(let a=0;a<objIdsArr.length;a++){
                for(let b=0;b<data.hits.length;b++){
                    if(data.hits[b].objectID==objIdsArr[a]){
                        data.hits.splice(b,1)
                    }
                }
            }
        }
        let newData = data.hits;
        newData.map(o => o.upvote_count = 0)
        this.setState({newsList: newData})
    }
    render() {
        let cols = {
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
                {/* <ResponsiveTable columns={cols} rows={this.state.newsList} /> */}
                <table className="responsive-table">
                <thead>
                    <tr>
                        <th>top</th>
                        <th>New</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.newsList.map((item, i) => 
                        <div key={i} className="item">
                            <div className="content">
                                {item.num_comments}
                            </div>
                            <div className="content">
                                {item.upvote_count}
                            </div>
                            <div className="content" onClick={this.vote.bind(this, i)}>^</div>
                            <a className="content" href={item.url}>
                                {item.title}
                            </a>
                            <a className="content" href={item.url}>
                                {item.url}
                            </a>
                            <div className="content">
                                {item.author}
                            </div>
                            <div className="content">
                                {~~((new Date().getTime() - item.created_at_i)/(100*60*60))} hours ago
                            </div>
                            <div className="content" onClick={this.hide.bind(this, i,item)}> [ Hide ] </div>
                        </div>
                    )
                }
                </tbody>
                </table>
                <div className="btnContainer">
                    <button onClick={this.loadMore.bind(this)}>More</button>
                </div>
            </div>
        );
    }
}

export default NewsListComponent;