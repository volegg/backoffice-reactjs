import { Button, Table, Tag, Typography } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import type { User } from '../../api/types';
import { AppRoles } from '../../const/roles';
import { DeleteOutlined } from '@ant-design/icons';

type DataType = User;

type UserListProps = {
  data: User[];
  loading: boolean;
  selectUser: (user: User) => void;
  deleteClick: (user: User) => void;
  pagination?: { page: number; pageSize: number; total: number };
  onChangeTable: (paginationConfig: TablePaginationConfig) => void;
}

const { Link } = Typography;

export function UserList({ data, loading, pagination, onChangeTable, selectUser, deleteClick }: UserListProps) {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, user) => <Link onClick={() => selectUser(user)}>{text}</Link>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, { roles }) => (
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
    },
    {
      title: 'Permissions',
      key: 'permissions',
      dataIndex: 'permissions',
      render: (_, { permissions }) => (
        <>
          {permissions.map((tag) => {
            let color = tag.endsWith('update') ? 'geekblue' : 'green';

            if (tag === 'delete') {
              color = 'red';
            }

            return (<Tag color={color} key={tag}>{tag}</Tag>);
          })}
        </>
      ),
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
      render: (_, user) => (
        <Button color="danger" onClick={() => deleteClick(user)}><DeleteOutlined /></Button>
      ),
    },
  ];

  return <Table<DataType> columns={columns} dataSource={data} loading={loading} pagination={pagination} onChange={onChangeTable} />;
}

function renderDate(value: string) {
  return new Date(value).toLocaleString();
}