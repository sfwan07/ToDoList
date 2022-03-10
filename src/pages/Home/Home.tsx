import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GroupViewModel,
  UserViewModel,
  TaskStatus,
  Profile,
  TaskViewModel,
} from "../../store/model";
import { getProfile } from "../../helper/helper";

import {
  Avatar,
  Badge,
  Breadcrumb,
  Card,
  Col,
  Divider,
  List,
  Row,
  Skeleton,
  Statistic,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";

import "./Home.scss";

const Home = () => {
  const { groups, users } = useSelector((state: any) => ({
    groups: state.Groups.all as GroupViewModel[],
    users: state.Users.all as UserViewModel[],
  }));

  const [profile, setProfile] = useState<Profile | undefined>();
  const [statistic, setStatistic] = useState({
    open: 0,
    progress: 0,
    review: 0,
    done: 0,
    groups: 0,
    users: 0,
  });

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  useEffect(() => {
    let myGroups = groups;
    let myTasks: TaskViewModel[] = [];
    if (profile && !profile.role.includes("admin"))
      myGroups = groups.filter(i => i.users.includes(profile.id));

    myGroups.forEach(group => {
      myTasks = [...myTasks, ...group.tasks];
    });

    setStatistic({
      open: myTasks.filter(s => s.status == TaskStatus.open).length,
      progress: myTasks.filter(s => s.status == TaskStatus.progress).length,
      review: myTasks.filter(s => s.status == TaskStatus.review).length,
      done: myTasks.filter(s => s.status == TaskStatus.done).length,
      groups: myGroups.length,
      users: users.length,
    });
  }, [groups, users]);

  return (
    <Row className="home" justify="start" gutter={8}>
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
            <span>Home</span>
          </Breadcrumb.Item>
          /
        </Breadcrumb>
      </Col>
      {/*  Users Info */}
      <Col md={6} sm={12}>
        <Card>
          <Statistic
            title="Open"
            value={statistic.open}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            suffix={"Tasks"}
            // prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>

      <Col md={6} sm={12}>
        <Card>
          <Statistic
            title="Progress"
            value={statistic.progress}
            precision={0}
            suffix={"Tasks"}
            valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>

      <Col md={6} sm={12}>
        <Card>
          <Statistic
            title="Review"
            value={statistic.review}
            precision={0}
            suffix={"Tasks"}
            valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>

      <Col md={6} sm={12}>
        <Card>
          <Statistic
            title="Done"
            value={statistic.done}
            precision={0}
            suffix={"Tasks"}
            valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>

      {/* Admin Info */}
      {profile && profile.role == "admin" && (
        <Col md={6} sm={12}>
          <Card>
            <Statistic
              title="Users"
              value={statistic.users}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              // prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      )}

      {profile && profile.role == "admin" && (
        <Col md={6} sm={12}>
          <Card>
            <Statistic
              title="Groups"
              value={statistic.groups}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              // prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default Home;
