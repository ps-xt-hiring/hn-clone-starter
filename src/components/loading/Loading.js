import React from 'react';

const Loading = props => {
    return (<div className="message-text">{props.message ? props.message : 'Loading'}</div>);
}

export default Loading;