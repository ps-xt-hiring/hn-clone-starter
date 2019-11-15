import React from 'react';
import {LOADING} from '../../utils/constants';

export default function Loader({loading}) {
  return (
    <>
      {
        loading &&
          <p className='loading'>{LOADING}</p>
      }
    </>
  )
}