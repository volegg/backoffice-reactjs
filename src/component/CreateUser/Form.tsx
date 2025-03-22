import { Form, Input, Button, Typography, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ErrorComponent } from "../ErrorComponent";
import { useApi } from "../../hooks/useApi";
import { AppRoles } from "../../const/roles";
import type { CreateUserType } from "../../api/types";
import { useEffect } from "react";

const { Option } = Select;

type CreateFormProps = {
  submit: () => void;
}

export function CreateForm({ submit }: CreateFormProps) {
  const { loading, error, fetch, setError, data } = useApi('createUser');
  const { loading: loadingAdmin, error: errorAdmin, fetch: fetchAdmin, setError: setAdminError, data: adminData } = useApi('createAdmin');

  const [form] = Form.useForm();

  useEffect(() => {
    if (adminData || data) {
      onCloseError();
      submit();
    }
  }, [loadingAdmin, loading, error, errorAdmin]);

  return <>
    <ErrorComponent messages={error?.messages || errorAdmin?.messages} onClose={onCloseError} />
    <Form name="userCreate" onFinish={onSubmit} layout="vertical">
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please enter email" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter password" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Name" />
      </Form.Item>

      <Form.Item name="roles" label="Role" rules={[{ required: true }]}>
        <Select
          placeholder="Select role"
          onChange={onRoleChange}
          defaultValue={AppRoles.standart}
          allowClear
        >
          <Option value={AppRoles.standart}>{AppRoles.standart}</Option>
          <Option value={AppRoles.admin}>{AppRoles.admin}</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block disabled={loading || loadingAdmin}>Create</Button>
      </Form.Item>
    </Form>
  </>;

  function onSubmit({ email, roles, name, password }: CreateUserType) {
    const fixRole = roles as unknown as AppRoles;

    if (fixRole === AppRoles.standart) {
      fetch({ email, name, password, roles: [fixRole] });
    }

    if (fixRole === AppRoles.admin) {
      fetchAdmin({ email, name, password, roles: [fixRole] });
    }
  }

  function onCloseError() {
    setError();
    setAdminError();
  }

  function onRoleChange(value: string) {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };
}