import { AppRoles } from "../const/roles";

export type User = {
  _id: string;
  email: string;
  name: string;
  roles: AppRoles[];
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export type Transaction = {
  _id: string;
  type: string;
  subType: string[];
  amount: number;
  status: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}