import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Row, Col, Form, Input, Button, Typography } from "antd";

import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { LoginModel } from "../../../store/model";
import { login as handlerLogin } from "../../../store/action";

import "./Login.scss";
import TODOImage from "./../../../assets/img/ToDo.svg";
import { toast } from "react-toastify";

const Login = () => {
  const { Text } = Typography;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCallBack = useCallback(
    (res?: any, err?: any) => {
      if (res) {
        setTimeout(() => {
          toast.success("Login is successfully");
          setLoading(false);
          navigate("/");
          window.location.reload();
        }, 1000);
      }

      if (err) {
        toast.error("Fail to login");
        setLoading(false);
      }
    },
    [loading],
  );

  const onFinish = useCallback(
    (value: LoginModel) => {
      setLoading(true);
      dispatch(handlerLogin(value, onCallBack));
    },
    [loading],
  );

  return (
    <Row className="login" justify="center" align="middle">
      <Col md={16} sm={24}>
        <img className="ant-image" src={TODOImage} />
      </Col>
      <Col className="form-login" md={8} sm={24}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ userName: "", password: "" } as LoginModel}
          onFinish={onFinish}
          size={"middle"}
          autoComplete="off"
        >
          <h1>
            <SmileOutlined /> Hello...
          </h1>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={
                showPassword ? (
                  <EyeOutlined
                    onClick={() => setShowPassword(false)}
                    className="site-form-item-icon"
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setShowPassword(true)}
                    className="site-form-item-icon"
                  />
                )
              }
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="dashed" htmlType="submit" loading={loading}>
              Log In
            </Button>
          </Form.Item>

          <Form.Item className="note">
            <Text italic type="success">
              User Name: admin --- Password: 123
            </Text>
            <br />
            <Text italic type="success">
              User Name: guest --- Password: 123
            </Text>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
