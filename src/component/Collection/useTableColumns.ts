import { useMemo, type ReactNode } from "react";
import type { TableProps } from 'antd';
import { toTtitle } from "../../utils/string/toTitle";

export function useTableColumns<DataType extends Object, TKey extends keyof DataType = keyof DataType>(
  keys: TKey[],
  renders: Partial<Record<TKey, (value: DataType[TKey], entity: DataType) => ReactNode>> = {},
  extra: TableProps<DataType>['columns'] = [],
) {
  return useMemo(() => getTableColumns(keys, renders, extra), []);
}

function getTableColumns<DataType extends Object, TKey extends keyof DataType = keyof DataType>(
  keys: TKey[],
  renders: Partial<Record<TKey, (value: DataType[TKey], entity: DataType) => ReactNode>> = {},
  extra: TableProps<DataType>['columns'] = [],
): TableProps<DataType>['columns'] {
  const entityColumns = getColumns(keys, renders);
  const columns: TableProps<DataType>['columns'] = Object.values(entityColumns);

  columns.push(...extra);

  return columns;
}

function getColumns<DataType extends Object, TKey extends keyof DataType = keyof DataType>(keys: TKey[], renders: Partial<Record<TKey, (value: DataType[TKey], entity: DataType) => ReactNode>>) {
  return keys.reduce((acc, key) => {
    acc[key] = {
      title: toTtitle(String(key)),
      dataIndex: key,
      key,
      render: renders[key] ? renders[key] : undefined,
    };

    return acc;
  }, {} as Record<TKey, { title: string; dataIndex: TKey; key: TKey, render?: (value: DataType[TKey], entity: DataType) => ReactNode }>);
}
