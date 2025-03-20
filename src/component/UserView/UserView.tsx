import { Avatar, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';

import type { User } from "../../api/types";

import './styles.css';

type UserViewProps = {
  user: User;
}

const { Title, Text } = Typography;

export function UserView({ user }: UserViewProps) {
  const Value = ({ label, value }: { label: string, value: string }) => {
    return <><Text strong>{label}:&nbsp;</Text><Text>{value}</Text></>
  }

  return <div className="user-view">
    <Avatar size={64} icon={<UserOutlined />} />
    <Title level={1}>{user?.name}</Title>
    <Value label='Email' value={user?.email} />
    <Value label='Roles' value={user?.roles.join(', ')} />
    <Value label='Permissions' value={user?.permissions.join(', ')} />
    <Value label='Created at' value={new Date(user?.createdAt).toLocaleString()} />
    <Value label='Updated at' value={new Date(user?.updatedAt).toLocaleString()} />
  </div>;
}