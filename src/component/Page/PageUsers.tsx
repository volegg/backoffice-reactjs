import { useState } from "react";
import { Typography } from "antd";
import type { User } from "../../api/types";

import { renderDate } from "../../utils/render/date";
import { Collection } from "../Collection/Collection";
import { useTableColumns } from "../Collection/useTableColumns";
import { useApi } from "../../hooks/useApi";
import { UserView } from "../UserView/UserView";
import type { ModalWindowProps } from "../ModalWindow";
import { CreateUser } from "../CreateUser/CreateUser";
import { Button } from "../Button";
import { PermissionsTags, RolesTags } from "../ViewAsTag/Tags";

const { Link } = Typography;

export function PageUsers() {
  const { data: deleteData, request: deleteDoc, loading } = useApi('deleteUser');
  const [openModal, setOpenModal] = useState<ModalWindowProps | undefined>();

  const columns = useTableColumns<User>([
    "email",
    "name",
    "roles",
    "permissions",
    "createdAt",
    "updatedAt",
  ], {
    email: (value, entity) => <Link onClick={() => select(entity)}>{value}</Link>,
    roles: (_, { roles }) => <RolesTags values={roles} />,
    permissions: (_, { permissions }) => <PermissionsTags values={permissions} />,
    createdAt: renderDate,
    updatedAt: renderDate,
  }, [{
    title: 'Actions',
    key: 'actions',
    render: (_, user) => <Button type="delete" onClick={() => deleteClick(user)} />,
  }
  ]);

  return <Collection
    columns={columns}
    loading={loading}
    endpoint="users"
    openModal={openModal}
    optionChildren={<Button type="create" onClick={modalCreate} label='Create' />}
  />;

  function select(entity: User) {
    setOpenModal({
      title: 'View user ' + entity.email,
      children: <UserView user={entity} />,
      open: true,
      close: () => setOpenModal(undefined),
    });
  }

  function modalCreate() {
    setOpenModal({
      title: 'Create new user',
      children: <CreateUser submit={() => setOpenModal(undefined)} />,
      open: true,
      removeOkButton: true,
      close: () => setOpenModal(undefined),
    });
  }

  function deleteClick(doc: User) {
    deleteDoc(doc._id);
  }
}