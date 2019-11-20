import React from 'react';

const WithClass = ({classes}) => (
  <div className={classes}>
    {props.children}
  </div>
);

export default WithClass;

