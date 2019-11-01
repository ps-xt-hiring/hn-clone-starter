import React from 'react';
import { Row, Col } from 'reactstrap';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './header.styles.scss';

const HeaderComponent = () => (
  <Row className="header-comp p-1">
    <Col xs={1}>
      <Logo />
    </Col>
    <Col xs={11}>
      <a className="highlight pr-2" href="#">
        top
      </a>
      |
      <a href="#" className="pl-2">
        new
      </a>
    </Col>
  </Row>
);

export default HeaderComponent;
