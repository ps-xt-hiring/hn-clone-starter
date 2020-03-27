import React,{useEffect,useState,useContext, Fragment} from 'react';
import './UpvoteComp.scss';
import voteImg from './UpvoteIcon.PNG';

const UpvoteComp = ({storyId}) => {
    const [upvoteVal,setUpvoteVal] = useState(0);
    useEffect(()=>{
        let allVoteData=window.localStorage.getItem("allVoteData");
        if(allVoteData){
            allVoteData=JSON.parse(allVoteData);
            if(allVoteData[storyId]){
                setUpvoteVal(allVoteData[storyId]);
            }
        }
    },[])
    
    const callUpvoting= () =>{
        let allVoteData=window.localStorage.getItem("allVoteData");
        if(allVoteData){
            allVoteData=JSON.parse(allVoteData);
            if(!allVoteData[storyId]){
                allVoteData[storyId]=0
            }
            allVoteData[storyId]=allVoteData[storyId]+1
        }else{
            allVoteData={};
            allVoteData[storyId]=1;
        }
        window.localStorage.setItem("allVoteData",JSON.stringify(allVoteData))
        setUpvoteVal( upvoteVal + 1);
    }  
    return (    
        <Fragment>  
            <img src={voteImg} className="vote-img" alt="logo" onClick={callUpvoting} />
            <span className="upvote-data">{upvoteVal}</span>       
        </Fragment>
      )

    };

    export default UpvoteComp;