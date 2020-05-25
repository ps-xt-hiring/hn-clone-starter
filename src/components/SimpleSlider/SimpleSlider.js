import React from 'react';
import './SimpleSlider.scss';

export default function SimpleSlider(props){
    return <div className="slidecontainer">
    <input className="simple-slider" type="range" min="1" max="100" value={props.credit} onChange={props.setCreditValue}/>
  </div>
}