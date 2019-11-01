import React from 'react';
import './Username.css';

const Username = ({author}) => {
    return (
        <div className="username">{author}</div>
    );
}

export default Username;