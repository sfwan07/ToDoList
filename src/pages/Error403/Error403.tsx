import { Col, Row } from "antd";
import React from "react";

import "./Error403.scss";
import Image403 from "../../assets/img/403.svg";

const Error403 = () => {
  return (
    <Row className="error403" align="middle" justify="center">
      <Col span={20}>
        <img src={Image403} />
      </Col>
    </Row>
  );
};

export default Error403;
