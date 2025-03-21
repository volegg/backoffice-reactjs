import { Button, Table, Tag, Typography } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import type { Transaction, User } from '../../api/types';
import { DeleteOutlined } from '@ant-design/icons';
import { TransactionStatus } from '../../const/transactions';

type DataType = Transaction;

const statusColor = {
  [TransactionStatus.completed]: 'green',
  [TransactionStatus.pending]: 'yellow',
  [TransactionStatus.failed]: 'red',
}

type TransactionListProps = {
  data: Transaction[];
  loading: boolean;
  selectUser: (user: User) => void;
  deleteClick: (transaction: Transaction) => void;
  pagination?: { page: number; pageSize: number; total: number };
  onChangeTable: (paginationConfig: TablePaginationConfig) => void;
}

export function TransactionList({ data, loading, selectUser, deleteClick, pagination, onChangeTable }: TransactionListProps) {
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
        <Typography.Link onClick={() => selectUser(user)}>{user.name}</Typography.Link>
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
      render: (data) => (
        <Button color="danger" onClick={() => deleteClick(data)}><DeleteOutlined /></Button>
      ),
    },
  ];

  return <Table<DataType> columns={columns} dataSource={data} loading={loading} pagination={pagination} onChange={onChangeTable} />;
}

function renderDate(value: string) {
  return new Date(value).toLocaleString();
}