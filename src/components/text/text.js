import React from 'react';

const Text = (props) => {
    return (
        <span className={`text-cl ${props.type}`}>
            {props.value}
        </span>
    )
}

export default Text;