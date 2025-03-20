import { useEffect, useState } from "react";
import { Avatar, Button, Form, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from "../../store/hooks"
import { useApi } from "../../hooks/useApi";
import { selectLoggedUser } from "../../store/user/selectors";
import { userSlice } from "../../store/user/reducer";
import { ErrorComponent } from "../ErrorComponent";
import { UserView } from "../UserView/UserView";

import './styles.css';

export function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);
  const [isEdit, setEdit] = useState<boolean>(false);
  const { data, loading, fetch, error, setError } = useApi('updateMe');

  useEffect(() => {
    if (data) {
      dispatch(userSlice.actions.setLoggedUser(data));
      setEdit(false);
    };
  }, [data]);

  if (!user) {
    return null;
  }

  return <div className="user-profile">
    {isEdit ? <>
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
        <Button type='default' onClick={onCancel}>Cancel</Button>&nbsp;&nbsp;&nbsp;
        <Button type='primary' htmlType='submit' disabled={loading}>Save</Button>
      </Form>
    </>
      : <>
        <UserView user={user} />
        <br />
        {user.permissions.includes('User:update') ? <Button type='primary' style={{ width: "25%" }} onClick={onEditClick}>Edit info</Button> : null}
      </>
    }
  </div>;

  function onCloseError() {
    setError();
  }

  function onCancel() {
    setEdit(false);
  }

  function onEditClick() {
    setEdit(true);
    onCloseError();
  }

  function onSaveClick({ name }) {
    fetch({ name });
  }
}