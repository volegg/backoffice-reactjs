import { Form, Input, Button, Select } from "antd";
import { LockOutlined, MehOutlined, UserOutlined } from "@ant-design/icons";
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
  const { loading, error, request: fetch, setError, data } = useApi('createUser');
  const { loading: loadingAdmin, error: errorAdmin, request: fetchAdmin, setError: setAdminError, data: adminData } = useApi('createAdmin');

  const [form] = Form.useForm();

  useEffect(() => {
    if (adminData || data) {
      onCloseError();
      submit();
    }
  }, [loadingAdmin, loading, error, errorAdmin]);

  const formName = "createUser" + Date.now();

  return <>
    <ErrorComponent messages={error?.messages || errorAdmin?.messages} onClose={onCloseError} />
    <Form name={formName} onFinish={onSubmit} layout="vertical" autoComplete="off">
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please enter email" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter password" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input prefix={<MehOutlined />} placeholder="Name" autoComplete="off" />
      </Form.Item>

      <Form.Item name="roles" label="Role">
        <Select
          placeholder="Select role"
          defaultValue={AppRoles.standart}
          value={AppRoles.standart}
        >
          <Option value={AppRoles.standart}>{AppRoles.standart}</Option>
          <Option value={AppRoles.admin}>{AppRoles.admin}</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={loading || loadingAdmin}>Create</Button>
      </Form.Item>
    </Form>
  </>;

  function onSubmit({ email, roles, name, password }: CreateUserType) {
    const fixRole = roles as unknown as AppRoles;

    if (fixRole === AppRoles.admin) {
      fetchAdmin({ email, name, password, roles: [fixRole] });

      return;
    }

    fetch({ email, name, password, roles: [fixRole] });
  }

  function onCloseError() {
    setError();
    setAdminError();
  }
}