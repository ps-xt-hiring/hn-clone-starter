import React from 'react';
import { Row, Col } from 'reactstrap';
import Logo from '../../assets/y18.gif';
import './header.styles.scss';
import { TEXT } from '../../helpers/constant';

const HeaderComponent = () => (
  <Row className="header-comp p-1">
    <Col xs={12}>
      <span>
        <img src={Logo} alt={TEXT.HACKER_NEWS} className="logo" />
      </span>
      <a
        className="highlight pr-2 pl-2"
        href="http://www.hackernews.com"
        title="Hacker News"
      >
        {TEXT.TOP}
      </a>
      |
      <a href="http://www.hackernews.com" title="Hacker News" className="pl-2">
        {TEXT.NEW}
      </a>
    </Col>
  </Row>
);

export default HeaderComponent;
