improt React, { Component } from 'react';
import Upvote from './Upvote'
import Upvote from './NewsLink'
import Upvote from './LinkSubInfo'

class NewsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            newsFeed: []
        }
        this.currTime = new Date();
    }
    
    const apiCall = () => {
        // fetch("").then(resp => {});
        this.setState({
            newsFeed: Response.hits
        });
    }
    const handleUpvote = (objectID) => {
        //To DO will handle upvotes and update state if needed
        var upvoteTracker = localStorage.upvotes ?  JSON.parse(localStorage.upvotes) : {}
        if(upvoteTracker[currObj]){
            currObj[objectID].value += 1;
            localStorage.upvotes = JSON.stringify(upvoteTracker);
        }
        else{
            var currObj = {};
            currObj[objectID].value = 1;
            localStorage.upvotes = JSON.stringify(currObj);
        }
        
        localStorage.upvotes = {...upvoteTracker, ...}
    }

    const getFormattedTimeAgo = (timeSt) => {
        var readableTime = new Date(timeSt);
        var timeDiff = (new Date(readableTime.getTime() - this.currTime.getTime())).getMinutes();
        return `${timeDiff} minutes ago`;
    }

    render(){
        const { newsFeed }= this.state;
        return(
            <div>
                {newsFeed.length > 0 ? 
                    ( <ol>
                    {newsFeed.map(val => {
                        <li key={val.objectID}>
                            <Upvote handleClick={this.handleUpvote} data={val.objectID}/>
                            <NewsLink displayText={val._highlightResult.title.value} navigateTo={val._highlightResult.url.value}/>
                            <LinkSubInfo points={`${val.points} points`} author={val._highlightResult.author.value} timeAgo={this.getFormattedTimeAgo(val.created_at)} comments={`${val.num_comments} comments`}/>
                        </li>
                    })}
                    </ol>)
                :
                <div>Loading...</div>}
               
            </div>
        )
    }
}

export default NewsList;