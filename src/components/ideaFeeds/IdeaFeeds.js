import React,{useEffect,useState, Fragment} from 'react';
import './IdeaFeeds.scss';
import UpvoteComp from './upvoteComp/UpvoteComp';

const IdeaFeeds = ({urlfetch,pageIndex}) => {
    const [dataFetchedArr,setFetchedDataArr] = useState([]);
    const [hideArray,setHideArray] = useState([]);

    useEffect(() => {
      if(urlfetch && urlfetch.url){
        fetch(urlfetch.url+pageIndex).then(response => response.json()).then((fetchedData)=>{
            //console.log(fetchedData.hits);
            setFetchedDataArr(fetchedData.hits);                 
        }).catch((err) => console.log('error is => ' , err))
      }else{
        console.log("please pass the data or source obj");
      }
    },[pageIndex]);

    const hideStory=(event,storyId)=>{
        event.preventDefault();
        console.log(storyId);
        let hideStoryData=window.localStorage.getItem('hideStoryData');
        if(hideStoryData){
            hideStoryData = JSON.parse(hideStoryData);
            hideStoryData.push(storyId);
        }else{
            hideStoryData=[storyId];            
        }
        window.localStorage.setItem('hideStoryData',JSON.stringify(hideStoryData));
        setHideArray(hideStoryData);
    }

    const checkHideStory=(storyId,storyTitle) => {
        let hideStoryData=window.localStorage.getItem('hideStoryData');
        let retVal=true;
        if(hideStoryData){
            hideStoryData = JSON.parse(hideStoryData);
            if(hideStoryData.indexOf(storyId)>-1){
                retVal= false;
            }
        }
        if(!storyTitle){
            return false;
        }
        return retVal;    }
    return (
    <div className="IdeaFeeds container">
        {dataFetchedArr.map( (idea,index) => {
            
            let numComments=0;
            if(idea.num_comments){
                numComments=idea.num_comments;
            }
           // console.log(index , '==> ' + numComments);
           return( <Fragment key={index}>
                {checkHideStory(idea.objectID,idea.title)?
                   ( <div className="IdeaFeed row p-2 mb-2 text-left border-bottom border-white" key={idea.objectID}>  
                        <div className="col-sm-2">
                            <span className="mr-1 h5 text-primary">{numComments}</span>
                            <UpvoteComp storyId={idea.objectID}/>
                        </div>
                        <div className="col-sm-10">
                            <span className="h5">{(idea.title || idea.story_title)}</span>
                            <a href={(idea.story_url||idea.url)} className="btn-link ml-1 small">(Link)</a>
                            <button className="btn btn-link" type="button" onClick={(e)=>{hideStory(e,idea.objectID)}}>[HIDE]</button>
                        </div>
                    </div>)
                :null
                }
            </Fragment>
           )
        })}
    </div>
    )  
};
    
    export default IdeaFeeds;