import { useState } from "react";
import { Typography } from "antd";
import type { Transaction, User } from "../../api/types";

import { renderDate } from "../../utils/render/date";
import { Collection } from "../Collection/Collection";
import { useTableColumns } from "../Collection/useTableColumns";
import { useApi } from "../../hooks/useApi";
import { UserView } from "../UserView/UserView";
import type { ModalWindowProps } from "../ModalWindow";
import { Button } from "../Button";
import { usePermissionCheck } from "../../hooks/usePermissionAccess";
import { useSelector } from "../../store/hooks";
import { selectIsAdmin } from "../../store/user/selectors";
import { StatusTag, SubTypeTag } from "../ViewAsTag/Tags";

type PageTransactionsProps = {
  endpoint: 'transactions' | 'transactionsMy';
}

const { Link } = Typography;

export function PageTransactions({ endpoint }: PageTransactionsProps) {
  const isAdmin = useSelector(selectIsAdmin);

  const hasReadUserAccess = usePermissionCheck('user:view');
  const hasCreateAccess = usePermissionCheck('transaction:create');
  const hasDeleteAccess = usePermissionCheck('transaction:delete');

  const { data: deleteData, request: deleteDoc, loading } = useApi('deleteUser');
  const [openModal, setOpenModal] = useState<ModalWindowProps | undefined>();

  const actions: Parameters<typeof useTableColumns<Transaction>>[2] = [];

  if (hasDeleteAccess) {
    actions.push({
      title: 'Actions',
      key: 'actions',
      render: (_, entity) =>
        <Button type='delete' onClick={() => deleteClick(entity)} />,
    });
  }

  const columnName: Parameters<typeof useTableColumns<Transaction>>[0] = [
    "type",
    "subType",
    "amount",
    "status",
    'user',
    "createdAt",
    "updatedAt",
  ];

  if (!isAdmin || !hasReadUserAccess) {
    columnName.splice(4, 1);
  }

  const columns = useTableColumns<Transaction>(columnName, {
    type: (_, entity) => <Link onClick={() => select(entity)}>{entity.type}</Link>,
    subType: (_, { subType }) => <SubTypeTag value={subType} />,
    user: (_, { user }) =>
      <>{hasReadUserAccess ? <Typography.Link onClick={() => selectUser(user)}>{user.email}</Typography.Link> : user.email}</>,
    status: (_, { status }) => <StatusTag value={status} />,
    createdAt: renderDate,
    updatedAt: renderDate,
  }, actions, "" + hasReadUserAccess + hasCreateAccess + hasDeleteAccess);

  return <Collection
    columns={columns}
    loading={loading}
    endpoint={endpoint}
    openModal={openModal}
    optionChildren={hasCreateAccess ? <Button type="create" onClick={modalCreate} label='Create' /> : null}
  />;

  function select(entity: Transaction) {
    setOpenModal({
      title: 'View transaction ' + entity.type,
      children: <></>,
      open: true,
      close: () => setOpenModal(undefined),
    });
  }

  function selectUser(user: User) {
    setOpenModal({
      title: 'View user ' + user.email,
      children: <UserView user={user} />,
      open: true,
      close: () => setOpenModal(undefined),
    });
  }

  function modalCreate() {
    setOpenModal({
      title: 'Add transaction',
      children: <></>,
      open: true,
      removeOkButton: true,
      close: () => setOpenModal(undefined),
    });
  }

  function deleteClick(doc: Transaction) {
    deleteDoc(doc._id);
  }
}