import { Key, ReactNode } from "react";
import { type MenuProps, Typography } from "antd";
import {
  ApartmentOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AppRoute } from "../const/routes";

type MenuItem = Required<MenuProps>['items'][number];

const { Link } = Typography;

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const MenuProfile = getItem('Profile', AppRoute.profile, <UserOutlined />);
export const MenuTransactions = getItem('Transactions', AppRoute.transactions, <ApartmentOutlined />);
export const MenuUsers = getItem('Users', AppRoute.users, <TeamOutlined />);
export const MenuLogout = getItem('Logout', AppRoute.logout, <LogoutOutlined />);

export function getMenuPageSize(onLimitClick: (limit: number) => void): { items: MenuProps['items'] } {
  return {
    items: [
      {
        key: '2',
        label: <Link onClick={() => onLimitClick(2)}>2</Link>,
      },
      {
        key: '5',
        label: <Link onClick={() => onLimitClick(5)}>5</Link>,
      },
      {
        key: '10',
        label: <Link onClick={() => onLimitClick(10)}>10</Link>,
      },
      {
        key: '25',
        label: <Link onClick={() => onLimitClick(25)}>25</Link>,
      },
      {
        key: '50',
        label: <Link onClick={() => onLimitClick(50)}>50</Link>,
      },
    ]
  }
}

