import React, { Component } from 'react';
import axios from 'axios'
import './NewsListComponent.css';
import ResponsiveTable from './ResponsiveTable'

class NewsListComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newsList:[],
            hiddenListArray:[]
        }
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
        newHiddenRowList.splice(index,1)
        this.state.hiddenListArray.push(item)
        localStorage.setItem("hiddenListArray",JSON.stringify(this.state.hiddenListArray))
        //newHiddenRowList[i].isHidden = true;
        this.setState({newsList:newHiddenRowList})
        console.log("new state",this.state.newsList);
    }
    async componentDidMount() {
        const {data} = await axios.get('https://hn.algolia.com/api/v1/search')
        console.log("hello")
        //data.hits.map(o => o.upvote_count = 0)
        //data.hits.map(index => index.isHidden = false)
        let hiddenItems = JSON.parse(localStorage.getItem("hiddenListArray"))
        var objIdsArr=[];
        for(let i=0;i<hiddenItems.length;i++){
            objIdsArr.push(hiddenItems[i].objectID)
        }
        var result;
        // for(let index=0;index<objIdsArr.length;index++){
            result = data.hits.filter((item)=>{
                return item.objectID != objIdsArr[0]; 
                return item.objectID != objIdsArr[1]; 
            })
        // }
        console.log("result",result)
        console.log("objIdsArr",objIdsArr)
        var index = data.hits.indexOf(hiddenItems)
        var newData = data.hits;
        // if(index>-1){
        //     newData = data.hits.splice(index,1)
        // }
        this.setState({newsList: newData})
        console.log("state",this.state.newsList)
    }
    
    render() {
        // var cols = {
        //     num_comments: 'No of comments',
        //     upvote_count:'Upvotes',
        //     upvote:'upvote',
        //     title: 'Title',
        //     url: 'URL',
        //     author: 'Author',
        //     created_at_i:'Created at'
        // }
        return (
            <div className="NewsList">
                {/* <ResponsiveTable columns={cols} rows={this.state.newsList} /> */}
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
                            <div className="content">
                                {item.title}
                            </div>
                            <div className="content" onClick={this.hide.bind(this, i,item)}>Hide</div>
                        </div>
                    )
                }
                <a href="#">More</a>
            </div>
        );
    }
}

export default NewsListComponent;