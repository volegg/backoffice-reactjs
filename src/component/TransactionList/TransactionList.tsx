import { Button, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { Transaction, User } from '../../api/types';
import { AppRoles } from '../../const/roles';
import { DeleteOutlined } from '@ant-design/icons';
import { TransactionStatus } from '../../const/transactions';

type DataType = Transaction;

const statusColor = {
  [TransactionStatus.completed]: 'green',
  [TransactionStatus.pending]: 'yellow',
  [TransactionStatus.failed]: 'red',
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Subtype',
    dataIndex: 'subType',
    key: 'subType',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Permissions',
    key: 'permissions',
    dataIndex: 'permissions',
    render: (_, { status }) =>
      <Tag color={statusColor[status]} key={status}>{status.toUpperCase()}</Tag>,
  },
  {
    title: 'Client',
    key: 'user',
    dataIndex: 'user',
    render: (_, { user }) =>
      <a>{user.name}</a>
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_, { createdAt }) => {
      return renderDate(createdAt);
    }
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (_, { updatedAt }) => {
      return renderDate(updatedAt);
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_,) => (
      <Button color="danger"><DeleteOutlined /></Button>
    ),
  },
];

type UserListProps = {
  data: Transaction[];
  loading: boolean;
}

export function TransactionList({ data, loading }: UserListProps) {
  return <Table<DataType> columns={columns} dataSource={data} loading={loading} />;
}

function renderDate(value: string) {
  return new Date(value).toLocaleString();
}