import React from "react";
import {
  ClockCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  EditOutlined,
  RestOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Tag, Button, Tooltip, Popconfirm, Avatar } from "antd";
import {
  GroupViewModel,
  Profile,
  TaskStatus,
  TaskViewModel,
} from "../../store/model";

const parentColumns = (
  users: Profile[],
  handlerRemoveGroup: (id: number) => void,
  handlerEditGroup: (item: GroupViewModel) => void,
) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: () => <a>Publish</a>
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
      render: (ids: number[], record: GroupViewModel) => (
        <>
          {ids?.map(i => (
            <Popconfirm
              title="Are you sure to delete this user?"
              // onConfirm={() => handlerRevokeUser(record.id, i)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tag visible color={"green"} className="site-tag-mins pointer">
                {users.find(user => user.id == i)?.name || "Users"}
              </Tag>
            </Popconfirm>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: number, record: GroupViewModel) => (
        <div className="site-button-ghost-wrapper">
          <Tooltip title="Edit Group">
            <Button
              type="dashed"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handlerEditGroup(record)}
            />
          </Tooltip>{" "}
          <Tooltip title="Remove Group">
            <Popconfirm
              title="Are you sure to delete this group?"
              onConfirm={() => handlerRemoveGroup(id)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="dashed"
                danger
                shape="circle"
                icon={<RestOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];
};

const childColumns = () => {
  return [
    {
      title: "Task",
      key: "task",
      dataIndex: "task",
      // render: () => <a>Publish</a>
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      // render: () => <a>Publish</a>
    },
    {
      title: "Status",
      dataIndex: "status",
      // align: "center",
      render: (text: TaskStatus, record: any) => {
        switch (text) {
          case TaskStatus.open:
            return (
              <Tag icon={<ClockCircleOutlined />} color="default">
                OPEN
              </Tag>
            );
          case TaskStatus.progress:
            return (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Progress
              </Tag>
            );
          case TaskStatus.review:
            return (
              <Tag icon={<ExclamationCircleOutlined />} color="warning">
                Review
              </Tag>
            );
          case TaskStatus.done:
            return (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Done
              </Tag>
            );
          default:
            return (
              <Tag icon={<MinusCircleOutlined />} color="default">
                New
              </Tag>
            );
        }
      },
    },
  ];
};

export { parentColumns, childColumns };
