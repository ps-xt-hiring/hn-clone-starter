import React from 'react';
import { Row, Col } from 'reactstrap';

const Spinner = () => (
  <Row>
    <Col xs="12" className="text-center">
      <div className="spinner-border text-center" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Col>
  </Row>
);

export default Spinner;
