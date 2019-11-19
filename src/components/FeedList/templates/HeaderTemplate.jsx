import React from 'react';
import Logo from '../../../images/y18.gif';

export default function HeaderTemplate({ data }) {
  return (
    <ul className='header'>
      <li className='logo'><img src={Logo} alt="load" /></li>
      <li className='label top-label'>{data[0]}</li>
      <li className='label new-label'>{data[1]}</li>
    </ul>
  )
}
