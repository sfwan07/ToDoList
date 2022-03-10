import { Layout } from "antd";
import React from "react";

import "./NonAuthLayout.scss";

const NonAuthLayout = (props: { children: any }) => {
  return <Layout className="layout-unAuth">{props.children}</Layout>;
};

export default NonAuthLayout;
