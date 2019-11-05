import React from 'react';
import { ReactComponent as Icon} from './drop-up-arrow.svg';
import PropTypes from 'prop-types';

function DataTable(props) {
    const url = props.data.url && props.data.url.split('/')[2];
    const createdByTime = props.data['created_at'];
    const apiDate = createdByTime.slice(8,10);
    const apiHour = createdByTime.slice(11,13);
    const apiMinutes = createdByTime.slice(14,16);

    const date = new Date();
    const todaysDate = date.getDate();
    const todaysHours = date.getHours();
    const todaysMinutes = date.getMinutes();

    
    var displayTime = '';
    if(apiDate === todaysDate.toString()) {
      if(todaysHours > apiHour) {
        displayTime = `${todaysHours - apiHour} hours ago`;
      } else {
        displayTime = `${todaysMinutes - apiMinutes} minutes ago`;
      }
    } else {
      displayTime =`${24-apiHour + todaysHours} hours ago`;
    }

  return (
    <tr>
    <td className="comments"> {props.data.num_comments ? props.data.num_comments : 0} </td>
    <td className="upvote-counts"> {props.data.points}{' '} <Icon className="upvote-icon" onClick={() => props.onUpvoteHandler(props.index)} /> </td>
    <td className="all-info"> 
      <span className="title">{props.data.title}{' '}</span>
      <span className="domain">({url}){' '}</span>
      <span className="by">by{' '}</span>
      <span className="username">{props.data.author}{' '}</span>
      <span className="posted-when">{displayTime}{' '}</span>
      <span className="hide-post" onClick={() => props.onHideHandler(props.index)}>[{' '}hide{' '}]</span>
    </td>
  </tr>
  )
}

DataTable.propTypes = {
  data: PropTypes.object.isRequired,
  onUpvoteHandler: PropTypes.func.isRequired,
  onHideHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
export default DataTable;