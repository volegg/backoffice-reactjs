import { Tag } from "antd";
import { AppRoles } from "../../const/roles";
import { TransactionStatus, TransactionSubType } from "../../const/transactions";

type ViewRulesProps = {
  values: AppRoles[];
}

type ViewPermissionsProps = {
  values: string[];
}

const pColor = ['orange', 'green', 'geekblue', 'blue', 'red'];

const statusColor = {
  [TransactionStatus.completed]: 'green',
  [TransactionStatus.pending]: 'yellow',
  [TransactionStatus.failed]: 'red',
}

const subTypeColor = {
  [TransactionSubType.refund]: 'red',
  [TransactionSubType.purchase]: 'geekblue',
  [TransactionSubType.reward]: 'orange',
}

export function RoleTag({ value }: { value: AppRoles }) {
  let color = value === AppRoles.admin ? 'red' : 'geekblue';

  if (value === AppRoles.halk) {
    color = 'green';
  }

  return <Tag color={color} key={value + Date.now()}>{value.toUpperCase()}</Tag>;
}

export function RolesTags({ values }: ViewRulesProps) {
  return <>{[...values].sort().map((tag, i) => <RoleTag value={tag} key={tag + i} />)}</>;
}

export function PermissionsTags({ values }: ViewPermissionsProps) {
  return <>
    {[...values].sort().map((tag, i) => {
      const index = Object.values({
        create: tag.includes('create'),
        read: tag.includes('view'),
        update: tag.includes('edit'),
        find: tag.includes('find'),
        delete: tag.includes('delete'),
      }).findIndex((v) => v);

      return <Tag color={pColor[index]} key={tag + i + index}>{tag.toLowerCase()}</Tag>;
    })}
  </>;
}

export function StatusTag({ value }: { value: string }) {
  return <Tag color={statusColor[value]} key={value}>{value.toUpperCase()}</Tag>;
}

export function SubTypeTag({ value }: { value: string }) {
  return <Tag color={subTypeColor[value]} key={value}>{value.toUpperCase()}</Tag>;
}
