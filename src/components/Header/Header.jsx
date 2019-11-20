import React from 'react';

import Logo from '../../assets/y18.gif';
import TEXT from '../../constants/text.constants';
import './Header.scss';

const Header = () => (
    <>
      <div className='header'>
        <span>
          <img className='logo m-lr-2' src={Logo} alt={TEXT.HACKER_NEWS} />
        </span>
        <a className='m-tb-2 whiteText' href="http://www.hackernews.com" title="Hacker News">
          {TEXT.TOP}
        </a>
          &nbsp;|&nbsp;
        <a className='m-tb-2 darkGreyText' href="http://www.hackernews.com" title="Hacker News" >
          {TEXT.NEW}
        </a>
      </div>
    </>
  );

export default Header;