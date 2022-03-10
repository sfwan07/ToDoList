import React from "react";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  RestOutlined,
} from "@ant-design/icons";
import { Tag, Button, Tooltip, Popconfirm } from "antd";
import { Profile } from "../../store/model";

const Columns = (
  handlerRemove: (id: number) => void,
  handlerStatus: (id: number) => void,
  handlerEdit: (value: Profile) => void,
) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: boolean, record: Profile) => {
        return (
          <Popconfirm
            title="Are you sure to change stauts this user?"
            onConfirm={() => handlerStatus(record.id)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text">
              {text ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Enable
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Disable
                </Tag>
              )}
            </Button>
          </Popconfirm>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (text: any, record: Profile) => (
        <div className="site-button-ghost-wrapper">
          <Tooltip title="Edit">
            <Button
              type="dashed"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handlerEdit(record)}
            />
          </Tooltip>{" "}
          <Tooltip title="Remove">
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => handlerRemove(text)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="dashed"
                danger
                shape="circle"
                icon={<RestOutlined />}
                // onClick={() => handlerRemove(text)}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];
};

export default Columns;
