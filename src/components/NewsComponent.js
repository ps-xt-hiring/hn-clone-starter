import React, { propTypes } from 'react';
import Button from './Button';
import { rootUrl, daysAgo } from '../common/utils';


const NewsComponent = (props) => {
    console.log(props);
    const { item } = props;
    const { title, num_comments: numberOfComments, points: votes, url, author, created_at: time } = item;
    return (
        <tr>
            <td>{numberOfComments}</td>
            <td>{votes}</td>
            <td>{title} <a href={url} target="_blank">{rootUrl(url)} </a> by {author} {daysAgo(time) }
            [<button>hide</button>]</td>
        </tr>

    );
}

export default NewsComponent;