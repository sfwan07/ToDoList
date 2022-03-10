import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addUser, editUser, enableUser, removeUser } from "../../store/action";
import { Profile, UserModel } from "../../store/model";

import {
  Row,
  Col,
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Spin,
  Breadcrumb,
} from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SendOutlined,
  RestOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import "./Users.scss";
import Columns from "./Columns";

const Users = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { users } = useSelector((state: any) => ({
    users: state.Users.all as Profile[],
  }));

  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(
    (status: boolean) => {
      setVisible(status);
    },
    [visible],
  );

  const handlerEdit = useCallback((value: Profile) => {
    form.setFieldsValue(value);
    toggle(true);
  }, []);

  const handlerAdd = useCallback(() => {
    form.setFieldsValue({
      id: -1,
      name: "",
      password: "",
      role: "",
      userName: "",
      status: false,
    });
    toggle(true);
  }, []);

  const handlerStatus = useCallback((id: number) => {
    setLoading(true);
    dispatch(enableUser(id, onCallBack));
  }, []);

  const handlerRemove = useCallback((id: number) => {
    setLoading(true);
    dispatch(removeUser(id, onCallBack));
  }, []);

  const onCallBack = useCallback(
    (res?: any, err?: any) => {
      if (res) {
        setTimeout(() => {
          toast.success("Is successfully");
          setLoading(false);
          toggle(false);
        }, 1000);
      }

      if (err) {
        setTimeout(() => {
          toast.error("Fail");
          setLoading(false);
          toggle(false);
        }, 1000);
      }
    },
    [loading],
  );

  const onFinish = useCallback(
    (value: Profile) => {
      setLoading(true);
      if (value.id > -1) dispatch(editUser(value.id, value, onCallBack));
      else dispatch(addUser(value, onCallBack));
    },
    [loading],
  );

  return (
    <Row className="users">
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/users">
            <UserOutlined />
            <span>Users</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col span={24}>
        <Button
          loading={loading}
          type="dashed"
          className="btn-add-user"
          icon={<UserAddOutlined />}
          onClick={handlerAdd}
        >
          Add User
        </Button>
      </Col>
      <Col span={24}>
        {loading ? (
          <Spin size="large" tip="Loading..." />
        ) : (
          <Table
            bordered
            sticky
            scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
            dataSource={users.map(item => {
              return {
                ...item,
                key: item.id,
              };
            })}
            columns={Columns(handlerRemove, handlerStatus, handlerEdit)}
          />
        )}
      </Col>
      <Drawer
        push
        mask
        placement="right"
        onClose={() => toggle(false)}
        visible={visible}
      >
        <Form
          form={form}
          name="normal_user"
          className="form-user"
          // initialValues={selectUser}
          onFinish={onFinish}
          size={"middle"}
        >
          <h2>
            <UserAddOutlined /> Add User
          </h2>
          <Form.Item name="id" hidden>
            <Input type={"hidden"} />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
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

          <Form.Item name="role">
            <Select defaultValue={""}>
              <Option value="" disabled>
                Select Role
              </Option>
              <Option value="admin">Admin</Option>
              <Option value="user">Normal User</Option>
            </Select>
          </Form.Item>

          <Form.Item className="btn-form" wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="reset" type="dashed" htmlType="reset" danger>
              <RestOutlined /> Reset
            </Button>{" "}
            <Button
              className="send"
              type="dashed"
              htmlType="submit"
              loading={loading}
            >
              <SendOutlined /> Send
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Row>
  );
};

export default Users;
