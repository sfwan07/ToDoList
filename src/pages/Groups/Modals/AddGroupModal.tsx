import {
  Button,
  Drawer,
  Form,
  FormInstance,
  Input,
  Select,
  Space,
  Tag,
} from "antd";
import { GroupModel, Profile } from "../../../store/model";

import {
  UsergroupAddOutlined,
  GroupOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RestOutlined,
  SendOutlined,
} from "@ant-design/icons";

const tagRender = (props: any) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      // color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const AddGroupForm = (props: {
  listOfUsers: Profile[];
  handlerAdd: (value: GroupModel) => void;
  visible: boolean;
  toggle: (visible: boolean) => void;
  form: FormInstance<GroupModel> | undefined;
  loading: boolean;
}) => {
  return (
    <Drawer
      push
      mask
      placement="right"
      onClose={() => props.toggle(false)}
      visible={props.visible}
    >
      <Form
        form={props.form}
        name="normal_user"
        className="form-user"
        // initialValues={selectUser}
        onFinish={props.handlerAdd}
        size={"middle"}
      >
        <h2>
          <UsergroupAddOutlined /> Add Group
        </h2>
        <Form.Item name="id" hidden>
          <Input type={"hidden"} />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            prefix={<GroupOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item name="users">
          <Select
            defaultValue={[]}
            placeholder="Select Users"
            mode="multiple"
            showArrow
            tagRender={tagRender}
            options={props.listOfUsers.map(user => ({
              label: user.name,
              value: user.id,
            }))}
          />
        </Form.Item>

        <Form.List name="tasks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[key, "task"]}
                    rules={[{ required: true, message: "Missing  name" }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[key, "duration"]}
                    rules={[{ required: true, message: "Missing  duration" }]}
                  >
                    <Input type={"number"} placeholder="Duration" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Task
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className="btn-form" wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="reset" type="dashed" htmlType="reset" danger>
            <RestOutlined /> Reset
          </Button>{" "}
          <Button
            className="send"
            type="dashed"
            htmlType="submit"
            loading={props.loading}
          >
            <SendOutlined /> Send
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddGroupForm;
