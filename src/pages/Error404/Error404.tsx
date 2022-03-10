import { Col, Row } from "antd";
import React from "react";

import "./Error404.scss";
import Image404 from "../../assets/img/404.svg";

const Error404 = () => {
  return (
    <Row className="error404" align="middle" justify="center">
      <Col span={20}>
        <img src={Image404} />
      </Col>
    </Row>
  );
};

export default Error404;
