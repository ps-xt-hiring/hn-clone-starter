import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css'

const getHostname = url => {
  let hostname = '';
  if(url){
    if (url.includes('www.')) {
      hostname = url.split('www.')[1].split('/')[0]
    }
    return hostname;
  }
}

const ListItem = ({num_comments, points ,title,url, author, created_at}) => {
  const site = getHostname(url) || 'news.ycombinator.com';

  return (
    <li className="ListItem">
      <a>
      <a className="Comments"> {num_comments}</a>
      <span className="UpVotes"> {points}</span>
      <span className="Title">{title}</span>
      <span className="LinkDomain">({site})</span>
      <span className="author">by {author}</span>
      <span className="created">{created_at}</span>
      <button>hide</button>
      </a>
    </li>
  );
};

ListItem.propTypes = {
  by: PropTypes.string.isRequired,
  kids: PropTypes.array,
  score: PropTypes.number.isRequired,
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default ListItem;
