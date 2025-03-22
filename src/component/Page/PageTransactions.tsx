import { useState } from "react";
import { Tag, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { Transaction, User } from "../../api/types";

import { renderDate } from "../../utils/render/date";
import { Collection } from "../Collection/Collection";
import { useTableColumns } from "../Collection/useTableColumns";
import { useApi } from "../../hooks/useApi";
import { UserView } from "../UserView/UserView";
import type { ModalWindowProps } from "../ModalWindow";
import { CreateUser } from "../CreateUser/CreateUser";
import { TransactionStatus, TransactionSubType } from "../../const/transactions";
import { Button } from "../Button";

type PageTransactionsProps = {
  endpoint: 'transactions' | 'transactionsMy';
}

const statusColor = {
  [TransactionStatus.completed]: 'green',
  [TransactionStatus.pending]: 'yellow',
  [TransactionStatus.failed]: 'red',
}

const subTypeColor = {
  [TransactionSubType.refund]: 'green',
  [TransactionSubType.purchase]: 'yellow',
  [TransactionSubType.reward]: 'red',
}

const { Link } = Typography;

export function PageTransactions({ endpoint }: PageTransactionsProps) {
  const { data: deleteData, fetch: deleteDoc, loading } = useApi('deleteUser');
  const [openModal, setOpenModal] = useState<ModalWindowProps | undefined>();

  const columns = useTableColumns<Transaction>([
    "type",
    "subType",
    "amount",
    "status",
    'user',
    "createdAt",
    "updatedAt",
  ], {
    type: (_, entity) => <Link onClick={() => select(entity)}>{entity.type}</Link>,
    subType: (_, { subType }) => <Tag color={subTypeColor[subType]} key={subType}>{subType}</Tag>,
    user: (_, { user }) =>
      <Typography.Link onClick={() => selectUser(user)}>{user.name}</Typography.Link>,
    status: (_, { status }) =>
      <Tag color={statusColor[status]} key={status}>{status.toUpperCase()}</Tag>,
    createdAt: renderDate,
    updatedAt: renderDate,
  }, [{
    title: 'Actions',
    key: 'actions',
    render: (_, user) =>
      <Button type='delete' onClick={() => deleteClick(user)} />,
  }
  ]);

  return <Collection
    columns={columns}
    loading={loading}
    endpoint={endpoint}
    openModal={openModal}
    optionChildren={<Button type="create" onClick={modalCreate} label='create' />}
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