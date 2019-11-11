import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="heading">
      <div className="row">
        <div className="col-sm-10 headings">
          <a href="https://news.ycombinator.com">
            <img src="y18.gif" alt="ygify" />
          </a>
          <div className="heading-top">
            <span>top</span>
            <span className="heading-new">| new</span>
          </div>
        </div>
      </div>
    </div>
  );
}
