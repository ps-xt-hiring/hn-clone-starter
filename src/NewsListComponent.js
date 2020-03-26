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
        console.log("load more");
        let iCurrentPage = this.state.currentPage;
        iCurrentPage++;
        this.setState({currentPage:iCurrentPage})
        console.log("this.state.currentPage",this.state.currentPage)
        const {data} = await axios.get(`https://api.myjson.com/bins/x3eng`)
        console.log("data on oad more",data)
        let newsList = [...this.state.newsList,...data.hits]
        this.setState({newsList:newsList})
    }
    vote (i) {
		console.log("index",i);
        let newCountedArray = [...this.state.newsList]
        newCountedArray[i].upvote_count++;
        this.setState({newsList:newCountedArray})
    }
    hide (index,item) {
        console.log("hide row index",index);
        let newHiddenRowList = [...this.state.newsList]
        this.state.hiddenListArray.push(item)
        newHiddenRowList.splice(index,1)
        localStorage.setItem("hiddenListArray",JSON.stringify(this.state.hiddenListArray))
        this.setState({newsList:newHiddenRowList})
        console.log("new state",this.state.newsList);
    }
    async componentDidMount() {
        const {data} = await axios.get('https://hn.algolia.com/api/v1/search')
        let hiddenItems = JSON.parse(localStorage.getItem("hiddenListArray"))
        if(hiddenItems){
            var objIdsArr=[];
            for(let i=0;i<hiddenItems.length;i++){
                objIdsArr.push(hiddenItems[i].objectID)
            }
            var result;
            for(var a=0;a<objIdsArr.length;a++){
                for(var b=0;b<data.hits.length;b++){
                    if(data.hits[b].objectID==objIdsArr[a]){
                        data.hits.splice(b,1)
                    }
                    
                }
            }
        }
        
        var newData = data.hits;
        newData.map(o => o.upvote_count = 0)
        this.setState({newsList: newData})
        console.log("state",this.state.newsList)
    }
    calculateDuration=(date)=>{
        console.log("HHHHHHHHHHHHHHHW")
        return '5 days ago'
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
                        <a key={i} className="item" href={item.url}>
                            <div className="content">
                                {item.num_comments}
                            </div>
                            <div className="content">
                                {item.upvote_count}
                            </div>
                            <div className="content" onClick={this.vote.bind(this, i)}>^</div>
                            <div className="content">
                                {item.title}
                            </div>
                            <div className="content">
                                {item.url}
                            </div>
                            <div className="content">
                                {item.author}
                            </div>
                            <div className="content">
                                {~~((new Date().getTime() - item.created_at_i)/(100*60*60))} hours ago
                            </div>
                            <div className="content" onClick={this.hide.bind(this, i,item)}> [ Hide ] </div>
                        </a>
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