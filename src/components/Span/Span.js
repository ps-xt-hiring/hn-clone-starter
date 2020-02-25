import React from 'react';
import "./Span.css";
export default function Span(props){
return <span className="comments">
    {props.children}
</span>
}