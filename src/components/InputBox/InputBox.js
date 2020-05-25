import React from 'react';
import './InputBox.scss';

export default function InputBox(props){
    return <>
        <input className="inputBox" type="number" id="credit" value={props.credit} onChange={props.setCreditValue}/>
    </>
}