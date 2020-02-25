import React from 'react';
import "./Span.scss";
export default function Span(props){
return <span className="comments">
    {props.children}
</span>
}