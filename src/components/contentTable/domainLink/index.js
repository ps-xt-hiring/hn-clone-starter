import React from 'react';
import './DomainLink.css';

const findDomain = url => {
    if (url) {
        let splittedUrl = url.split('/');
        return `(${splittedUrl[2]})`;
    }
    return false;
}

const DomainLink = ({url}) => {
    return (
        <div className="link-domain">{findDomain(url)}</div>
    );
}

export default DomainLink;