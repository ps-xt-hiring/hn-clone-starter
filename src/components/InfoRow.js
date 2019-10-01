import React from 'react';
import upvote from '../arrow_up.png';

function InfoRow(props) {

    const getRows = (data = []) => {
        return data.map((d, i)=> {
            return (
                <tr>
                    <td>
                        {d.num_comments}
                    </td>
                    <td>
                        {d.upvote || 0}
                        <img src={upvote} onClick={(e) => {
                            props.upvote(d.objectID, i);
                        }}/>
                    </td>
                    <td>
                        {d.title}
                    </td>
                    <td>
                        {d.url}
                    </td>
                    <td>
                        {d.author}
                    </td>
                </tr>
            );
        })
    }
    return getRows(props.data)
}

export default InfoRow;
