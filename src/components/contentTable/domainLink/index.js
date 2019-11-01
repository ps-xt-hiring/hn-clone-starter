import React from 'react';
import './DomainLink.css';

const findDomain = (url) => {
  if (url) {
    const splittedUrl = url.split('/');
    return `(${splittedUrl[2]})`;
  }
  return false;
};

const DomainLink = ({ url }) => <div className="link-domain">{findDomain(url)}</div>

export default DomainLink;
