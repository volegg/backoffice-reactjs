import { Button, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { User } from '../../api/types';
import { AppRoles } from '../../const/roles';
import { DeleteOutlined } from '@ant-design/icons';

type DataType = User;

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <a>{text}</a>,
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
    render: (_,) => (
      <Button color="danger"><DeleteOutlined /></Button>
    ),
  },
];

type UserListProps = {
  data: User[];
  loading: boolean;
}

export function UserList({ data, loading }: UserListProps) {
  return <Table<DataType> columns={columns} dataSource={data} loading={loading} />;
}

function renderDate(value: string) {
  return new Date(value).toLocaleString();
}