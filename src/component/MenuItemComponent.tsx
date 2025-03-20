import { Key, ReactNode } from "react";
import type { MenuProps } from "antd";
import {
  ApartmentOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AppRoute } from "../const/routes";

type MenuItem = Required<MenuProps>['items'][number];

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
