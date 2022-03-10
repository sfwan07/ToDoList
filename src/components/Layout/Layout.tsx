import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Avatar, Button, Dropdown, Layout, Menu, PageHeader, Tag } from "antd";
import {
  HomeOutlined,
  EditOutlined,
  UserOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import "./Layout.scss";
import { Profile } from "../../store/model";
import { getProfile } from "../../helper/helper";

const CustomLayout = (props: { children: any }) => {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const { Sider, Content, Footer } = Layout;
  const location = useLocation();
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item
        key={"Logout"}
        danger
        icon={<LogoutOutlined />}
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const toggleDropdown = useCallback(() => {
    setVisibleDropdown(!visibleDropdown);
  }, [visibleDropdown]);

  return (
    <Layout className="layout">
      <Sider className="sidebar" theme="light" trigger={null}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/tasks" icon={<EditOutlined />}>
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          {profile && profile.role == "admin" && (
            <Menu.Item key="/users" icon={<UserAddOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
          )}
          {profile && profile.role == "admin" && (
            <Menu.Item key="/groups" icon={<UsergroupAddOutlined />}>
              <Link to="/groups">Groups</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <PageHeader
          title="To Do"
          className="site-page-header"
          extra={[
            <Dropdown
              trigger={["click"]}
              visible={visibleDropdown}
              overlay={menu}
            >
              <Button type="text" onClick={toggleDropdown}>
                <strong>{profile ? profile.name : "User"}</strong>
                <Avatar key={"avatar"} icon={<UserOutlined />} />
              </Button>
            </Dropdown>,
          ]}
          // breadcrumb={{ routes }}
        ></PageHeader>

        <Layout>
          <Content className="site-layout-background">{props.children}</Content>
          <Footer>Safwan Osama</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
