import React, { useCallback, useEffect, useState } from "react";
import { arrayMoveImmutable } from "array-move";
import { useDispatch, useSelector } from "react-redux";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Row, Col, Select, Tag, Table, Breadcrumb } from "antd";

import "./Tasks.scss";

import columns from "./Columns";
import { getGroupsByUser } from "../../store/action";
import {
  GroupViewModel,
  TaskStatus,
  GroupViewTable,
  nextStatus,
  Profile,
} from "../../store/model";

import { UnorderedListOutlined, HomeOutlined } from "@ant-design/icons";

import { getProfile, uniqueArrayOfObject } from "../../helper/helper";

const Tasks = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state: any) => ({
    groups: state.Groups.MyGroups as GroupViewModel[],
  }));

  // const [profile, setProfile] = useState<Profile | undefined>();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GroupViewTable[]>([]);

  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    [],
  );

  useEffect(() => {
    let profile = getProfile();
    if (profile) dispatch(getGroupsByUser(profile.id));
  }, []);

  useEffect(() => {
    if (groups) {
      let tasks: GroupViewTable[] = [];

      groups.forEach((group, i) => {
        tasks = [
          ...tasks,
          ...group.tasks.map((task, index) => ({
            key: index,
            task: task.task,
            status: task.status,
            groupName: group.name,
            index: index,
          })),
        ];
      });

      tasks = tasks.map((item, i) => ({ ...item, key: i, index: i }));
      setData(tasks);
      setLoading(false);
    }
  }, [groups]);

  useEffect(() => {
    setOptions(
      uniqueArrayOfObject(
        data.map(i => ({ label: i.groupName, value: i.groupName })),
        "value",
      ),
    );
  }, [groups]);

  const handlerUpdateStatus = (id: number, status?: TaskStatus) => {
    setLoading(true);
    let index = data.findIndex((i: GroupViewTable) => i.key == id);
    if (index < 0) return;

    let task: GroupViewTable = data[index];

    if (status == undefined) task.status = nextStatus(task.status);
    else if (status) task.status = status;

    let dataUpdate = data;
    dataUpdate[index] = task;
    setData(dataUpdate);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const SortableItem = SortableElement((props: any) => <tr {...props} />);
  const SortableBody = SortableContainer((props: any) => <tbody {...props} />);

  const DraggableContainer = (props: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = (restProps: any) => {
    const index = data?.findIndex(
      (x: any) => x.index === restProps["data-row-key"],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  const onSortEnd = (index: any, e: any) => {
    if (index.newIndex !== index.oldIndex) {
      const newData = arrayMoveImmutable(
        ([] as GroupViewTable[]).concat(data),
        index.oldIndex,
        index.newIndex,
      ).filter(el => !!el);
      setData(newData);
    }
  };

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const handleSelect = (value: string[]) => {
    let tasks: GroupViewTable[] = [];

    groups.forEach((group, i) => {
      tasks = [
        ...tasks,
        ...group.tasks.map((task, index) => ({
          key: index,
          task: task.task,
          status: task.status,
          groupName: group.name,
          index: index,
        })),
      ];
    });

    tasks = tasks.map((item, i) => ({ ...item, key: i, index: i }));

    if (value.length < 1) setData(tasks);
    else setData(tasks.filter(f => value.includes(f.groupName)));
  };

  return (
    <Row className="tasks" gutter={24}>
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/tasks">
            <UnorderedListOutlined />
            <span>Tasks</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <br />
      </Col>
      <Col span={24}>
        <Select
          allowClear
          mode="tags"
          showArrow
          tagRender={tagRender}
          placeholder="Select Group..."
          onChange={handleSelect}
          options={options}
        />
      </Col>
      <Col span={24}>
        <Table
          pagination={false}
          size={"small"}
          dataSource={data}
          columns={columns(handlerUpdateStatus)}
          rowKey="index"
          sticky
          loading={loading}
          scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }}
        />
      </Col>
    </Row>
  );
};

export default Tasks;
