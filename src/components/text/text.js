import React from 'react';

export default function Text(props) {
  const { type, value } = props;
  return (
    <span className={`text-cl ${type}`}>
      {value}
    </span>
  );
}
