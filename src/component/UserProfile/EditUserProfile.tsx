import { useEffect } from "react";
import { Avatar, Form, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from "../../store/hooks"
import { useApi } from "../../hooks/useApi";
import { selectLoggedUser } from "../../store/user/selectors";
import { userSlice } from "../../store/user/reducer";
import { ErrorComponent } from "../ErrorComponent";
import { Button } from "../Button";

import './styles.css';
import { usePermissionCheck } from "../../hooks/usePermissionAccess";

type EditUserProfileProps = {
  cancle: () => void;
}

export function EditUserProfile({ cancle }: EditUserProfileProps) {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);
  const { data, loading, request: fetch, error, setError } = useApi('updateMe');
  const hasEditPersmisson = usePermissionCheck('profile:edit', 'user:edit');

  useEffect(() => {
    if (data) {
      dispatch(userSlice.actions.setLoggedUser(data));
    };
  }, [data]);

  if (!user || !hasEditPersmisson) {
    return null;
  }

  return <div className="user-profile">
    <ErrorComponent messages={error?.messages} onClose={onCloseError} />
    <br />
    <Avatar size={64} icon={<UserOutlined />} />
    <br />
    <Form name='edit-profile' onFinish={onSaveClick} layout="vertical">
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Minimal name length is 3, maximum - 32", min: 3, max: 32 }]}
      >
        <Input prefix={<UserOutlined />} placeholder="New name" value={user.name} />
      </Form.Item>
      <br />
      <Button type='cancel' onClick={cancle}>Cancel</Button>&nbsp;&nbsp;&nbsp;
      <Button htmlType='submit' disabled={loading}>Save</Button>
    </Form>
  </div>;

  function onCloseError() {
    setError();
  }

  function onSaveClick(formData) {
    fetch(formData);
  }
}