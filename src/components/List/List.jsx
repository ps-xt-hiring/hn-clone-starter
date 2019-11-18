import React from 'react';
import './list.scss';

export default function List({items=[], keys, className=''}) {
  return (
    <ul className={`list-wrapper ${ className}`}>
      {
        items.map((itm, index) => {
          return (
            <li key={index} className='item'>{typeof itm === 'function' ? itm() : itm}</li>
          )
        })
      }
    </ul>
  )
}
