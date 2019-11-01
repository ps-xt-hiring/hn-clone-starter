import React, {useEffect, useState}  from 'react';
import NewsItem from '../newsItem/NewsItem';
import './feed.scss';

export default function Feed(props) {
    const [upvotedList, setUpvotedList] = useState([]);
    const [hiddenList, setHiddenList] = useState([]);

    useEffect(() => {
        localStorage.clear();
        const upvotedList = JSON.parse(localStorage.getItem('upvotedNewsItems')) || [];
        const hiddenList = JSON.parse(localStorage.getItem('hiddenNewsItems')) || [];
        setUpvotedList(upvotedList);
        setHiddenList(hiddenList);
    }, []);


    const upvoteNewsItem = (newsItem) => {
        const newList = [...upvotedList]
        let index = newList.findIndex(item => item.objectID === newsItem.objectID);
        if(index >= 0){
            newList.splice(index, 1);
        }else {
            newList.push(newsItem);
        }
        
        localStorage.setItem('upvotedNewsItems', JSON.stringify(newList)); 
        setUpvotedList(newList);
    }

    const hideNewsItem = (newsItem) => {
        const newList = [...hiddenList]
        let index = newList.findIndex(item => item.objectID === newsItem.objectID);
        if(index >= 0){
            newList.splice(index, 1);
        }else {
            newList.push(newsItem);
        }
        
        localStorage.setItem('hiddenNewsItems', JSON.stringify(newList)); 
        setHiddenList(newList);
    }
    
    const getType = (newsItem) => {
        let index = upvotedList ? upvotedList.findIndex(item => item.objectID === newsItem.objectID) : -1;
        if(index >= 0) {
            return '\u25BC';
        }else{
            return '\u25B2';
        }
    }

    const isHidden = (newsItem) => {
        let index = hiddenList ? hiddenList.findIndex(item => item.objectID === newsItem.objectID) : -1;
        if(index >= 0) {
            return false;
        }else{
            return true;
        }
    }

    if(props.feed.length) {
        return (
            <main className="row feed">
                {props.feed.map((item, index) => {
                    if(isHidden(item)){
                        return (
                            <NewsItem 
                                key={item.objectID} 
                                newsItem={item} 
                                order={index} 
                                hideNewsItem={hideNewsItem} 
                                upvoteNewsItem={upvoteNewsItem} 
                                isUpvoted={getType(item)}/>
                        )
                    }
                })}
                {props.isMore && <button className='btn-empty feed__more' onClick={props.loadMore}>more</button>}
            </main>
        )
    }else {
        return (
            <main className="row">
                <p>Loading...</p>
            </main>
        )
    }

    
}