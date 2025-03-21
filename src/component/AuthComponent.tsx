import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthType } from "../const/auth";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AppRoute } from "../const/routes";
import { ErrorComponent } from "./ErrorComponent";

export function AuthComponent({ type }: { type: AuthType }) {
  const labelLogin = 'Login';
  const labelSignUp = 'Sign Up';

  const { loading, error, fetch, setError, user } = useAuth(type);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(AppRoute.profile);
    }
  }, [user]);

  return <>
    <Typography.Title style={{ textAlign: 'center' }} level={2}>{type === AuthType.login ? 'Login' : 'Sign up'}</Typography.Title>
    <ErrorComponent messages={error?.messages} onClose={onCloseError} />
    <Form name={String(type)} onFinish={onSubmit} layout="vertical">
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

      {type === AuthType.signup && (
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" block disabled={loading}>
          {type === AuthType.login ? labelLogin : labelSignUp}
        </Button>
      </Form.Item>
    </Form>
  </>

  function onSubmit({ email, password }) {
    fetch({ email, password });
  }

  function onCloseError() {
    setError();
  }
}