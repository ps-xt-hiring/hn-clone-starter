import React from 'react';
import './Hide.css';

const Hide = (props) => {
    return (
        <div className="hide-button" onClick={() => props.hideAction(props.objectID)}>hide</div>
    );
}

export default Hide;