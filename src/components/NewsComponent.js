import React, { propTypes } from 'react';
import Button from './Button';
import { rootUrl, daysAgo } from '../common/utils';
import './news.css';

const NewsComponent = (props) => {
    console.log(props);
    const { item, hideMe, handleUpVote } = props;
    const { title, num_comments: numberOfComments, points: votes, url, author, created_at: time, objectID } = item;
    return (
        <tr>
            <td>{numberOfComments}</td>
            <td>{votes}</td>
            <div className="arrow-up" role="button" onClick={()=>handleUpVote(objectID)} onKeyUp={() => {}} tabIndex="0"> </div>
            <td>{title} <a href={url} target="_blank">{rootUrl(url)} </a> by {author} {daysAgo(time) }
            [<button onClick={()=>hideMe(objectID)}>hide</button>]</td>
        </tr>

    );
}

export default NewsComponent;