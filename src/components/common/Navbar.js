import React, {useState} from 'react';

const Navbar = () => {
  // const [feedtype, setFeedtype] = useState('New');

  return (
      <div className="container nav-top">
          <span className="nav-logo">Y</span>
         <div className="nav-info"> 
          <span>Top</span>
          <span>|</span>
          <span>{'New'}</span>
         </div> 
      </div>
  );

}

export default Navbar;