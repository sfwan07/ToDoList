import React from "react";
import { SortableHandle } from "react-sortable-hoc";

import { TaskStatus } from "../../store/model";
import {
  MenuOutlined,
  CheckCircleOutlined,
  StepForwardOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Tag, Button, Tooltip } from "antd";

const Columns = (
  handlerUpdateStatus: (id: number, status?: TaskStatus) => void,
) => {
  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
  ));

  return [
    {
      title: "Sort",
      dataIndex: "sort",
      width: 60,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "Task",
      dataIndex: "task",
      // align: "center",
      className: "drag-visible",
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
    {
      title: "Group",
      // align: "center",
      dataIndex: "groupName",
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "action",
      render: (text: any, record: any) => (
        <div className="site-button-ghost-wrapper">
          <Tooltip title="Next">
            <Button
              type="dashed"
              shape="circle"
              icon={<StepForwardOutlined />}
              onClick={() => handlerUpdateStatus(text)}
            />
          </Tooltip>{" "}
          <Tooltip title="Done">
            <Button
              type="dashed"
              shape="circle"
              icon={<CheckCircleOutlined />}
              onClick={() => handlerUpdateStatus(text, TaskStatus.done)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
};

export default Columns;
