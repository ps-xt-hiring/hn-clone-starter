import React, {useState} from 'react'
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import Button from '../button/button';

JavascriptTimeAgo.locale(en);

const NewsItem = (props) => {
    let [voteCounter, setVoteCounter] = useState(0);
    let [voteCounterClass, updateVoteCounterClass] = useState('low');
    let [hideArray, sethideArray] = useState([]);
    
    const shortUrl = (props.list.url) ? `${props.list.url.match(/:\/\/(.[^/]+)/)[1]}` : '';

    const upVote = () => {
        setVoteCounter(voteCounter = voteCounter + 1);

        if (voteCounter > 5 && voteCounter <= 10) {
            voteCounterClass = 'high';
        } else if (voteCounter > 10) {
            voteCounterClass = 'medium';
        }

        updateVoteCounterClass(voteCounterClass);
        localStorage.setItem(props.list.title, JSON.stringify(voteCounter));
    };

    const hideRecord = () => {
        sethideArray(hideArray = props.list);
        localStorage.setItem(props.list.title, JSON.stringify(hideArray));
    };

    return (
        <li>
            <div className="news-control-wrapper">
                <span className="num-comments">{props.list.num_comments}</span>
                <span className = {voteCounterClass}>{voteCounter}</span>
                {/* <button type="button" className="upVote fas fa-caret-up" onClick={() => upVote()} /> */}
                <Button className="upVote fas fa-caret-up" handleClick = {()=> upVote()} />
            </div>
            <div className="news-content-wrapper">
                <span>{props.list.title}</span>
                <span className="domain">{shortUrl}</span>
                <span className="label-by">by</span>
                <span className="author">{props.list.author}</span>
                <span className="created"><ReactTimeAgo date={props.list.created_at} /></span>
                {/* <button type="button" className="btn-hide" onClick={() => hideRecord()}>[hide]</button> */}
                <Button className="btn-hide" text = "here" handleClick = {()=> hideRecord()} />
            </div>
        </li>
    )
}

export default NewsItem;