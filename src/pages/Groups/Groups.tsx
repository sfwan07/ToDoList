import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { removeGroup } from "../../store/action";
import { GroupViewModel, Profile } from "../../store/model";

import { Row, Col, Button, Spin, Breadcrumb, Table } from "antd";

import {
  GroupOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import "./Groups.scss";
import { parentColumns, childColumns } from "./Columns";
import AddGroupForm from "./Modals/AddGroupModal";
import { ModalsFn } from "./Modals/Modals";

const Groups = () => {
  const { groups, users } = useSelector((state: any) => ({
    groups: state.Groups.all as GroupViewModel[],
    users: state.Users.all as Profile[],
  }));

  const fn = ModalsFn();

  return (
    <Row className="groups">
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/groups">
            <GroupOutlined />
            <span>Groups</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col span={24}>
        <Button
          loading={fn.loading}
          type="dashed"
          className="btn-add-group"
          icon={<UsergroupAddOutlined />}
          onClick={fn.toggleAddGroup}
        >
          Add Group
        </Button>
      </Col>
      <Col span={24}>
        {fn.loading ? (
          <Spin size="large" tip="Loading..." />
        ) : (
          <Table
            // bordered
            size="small"
            // rowClassName="components-table-demo-nested"
            columns={parentColumns(
              users,
              fn.handlerRemoveGroup,
              fn.toggleEditGroup,
            )}
            dataSource={groups.map((item, i) => {
              return {
                ...item,
                key: i,
              };
            })}
            expandable={{
              expandedRowRender,
            }}
            rowClassName={record => (record.name ? "show" : "hidden")}
          />
        )}
      </Col>
      <Col span={24}>
        <AddGroupForm
          listOfUsers={users}
          form={fn.formAddOrEditGroup[0]}
          handlerAdd={fn.handlerAddOrEditGroup}
          loading={fn.loading}
          toggle={fn.toggleAddGroup}
          visible={fn.visibleAddEditGroup}
          key={"AddGroup"}
        />
      </Col>
    </Row>
  );
};

const expandedRowRender = (
  group: GroupViewModel,
  index: number,
  indent: number,
  expanded: boolean,
) => {
  return (
    <Table
      bordered
      size="small"
      rowKey={e => e.id}
      key={index}
      columns={childColumns()}
      dataSource={group.tasks}
      pagination={false}
    />
  );
};

export default Groups;
