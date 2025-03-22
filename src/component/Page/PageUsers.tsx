import { useState } from "react";
import { Tag, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { User } from "../../api/types";
import { AppRoles } from "../../const/roles";

import { renderDate } from "../../utils/render/date";
import { Collection } from "../Collection/Collection";
import { useTableColumns } from "../Collection/useTableColumns";
import { useApi } from "../../hooks/useApi";
import { UserView } from "../UserView/UserView";
import type { ModalWindowProps } from "../ModalWindow";
import { CreateUser } from "../CreateUser/CreateUser";
import { Button } from "../Button";

const { Link } = Typography;

const pColor = ['orange', 'green', 'geekblue', 'blue', 'red'];

export function PageUsers() {
  const { data: deleteData, fetch: deleteDoc, loading } = useApi('deleteUser');
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
    roles: (_, { roles }) => (
      <>
        {roles.map((tag) => {
          let color = tag === AppRoles.admin ? 'red' : 'geekblue';

          if (tag === AppRoles.halk) {
            color = 'green';
          }

          return (<Tag color={color} key={tag}>{tag}</Tag>);
        })}
      </>
    ),
    permissions: (_, { permissions }) => (
      <>
        {permissions.map((tag) => {
          const index = Object.values({
            create: tag.includes('create'),
            read: tag.includes('read'),
            update: tag.includes('update'),
            find: tag.includes('find'),
            delete: tag.includes('delete'),
          }).findIndex((v) => v);

          return (<Tag color={pColor[index]} key={tag}>{tag}</Tag>);
        })}
      </>
    ),
    createdAt: renderDate,
    updatedAt: renderDate,
  }, [{
    title: 'Actions',
    key: 'actions',
    render: (_, user) => (
      <Button type="delete" onClick={() => deleteClick(user)} />
    ),
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