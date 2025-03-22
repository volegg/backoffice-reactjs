import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store/hooks"
import { useApi } from "../../hooks/useApi";
import { selectLoggedUser } from "../../store/user/selectors";
import { userSlice } from "../../store/user/reducer";
import { UserView } from "../UserView/UserView";
import { EditUserProfile } from "./EditUserProfile";
import { Button } from "../Button";

import './styles.css';
import { usePermissionCheck } from "../../hooks/usePermissionAccess";
import { Space } from "antd";
import { useLogout } from "../../hooks/useLogout";

export function UserProfile() {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedUser);

  const { data } = useApi('updateMe');
  const { request } = useApi('deleteMe');

  const { logout } = useLogout();

  const [isEdit, setEdit] = useState<boolean>(false);
  const hasEditPersmisson = usePermissionCheck('profile:view', 'user:view');

  useEffect(() => {
    if (data) {
      dispatch(userSlice.actions.setLoggedUser(data));
      setEdit(false);
    };
  }, [data]);

  if (!user || !hasEditPersmisson) {
    return null;
  }

  return <div className="user-profile">
    {isEdit
      ? <EditUserProfile cancle={onCancel} />
      : <>
        <UserView user={user} />
        <br />
        <Space>
          {user.permissions.includes('profile:delete') ? <Button type='delete' onClick={onDeleteClick}>Delete profile</Button> : null}
          {user.permissions.includes('profile:edit') ? <Button type='edit' onClick={onEditClick}>Edit</Button> : null}
        </Space>
      </>
    }
  </div>;

  function onCancel() {
    setEdit(false);
  }

  function onEditClick() {
    setEdit(true);
  }

  function onDeleteClick() {
    request();
    logout();
  }
}