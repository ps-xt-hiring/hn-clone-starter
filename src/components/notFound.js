import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <div>
      <div>
        <h1>Oops!</h1>
        <h2>404 page not found</h2>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
      <Link to="/">Go TO Homepage</Link>
    </div>
  </div>
);
export default NotFound;
