import { Key, useEffect, useState, type ReactNode } from 'react';
import { Layout, Space, Button, Dropdown, Table, type TablePaginationConfig, type TableProps, Pagination, Checkbox, type CheckboxOptionType, Divider } from 'antd';
import { getMenuPageSize } from '../MenuItemComponent';
import { ModalWindow, type ModalWindowProps } from '../ModalWindow';
import { usePagination } from '../../hooks/pagination';
import type { APIPagination } from '../../hooks/useApi';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnTitle } from 'antd/es/table/interface';
import { S } from 'react-router/dist/development/route-data-CGHGzi13';

export type CollectonProps<TDataType> = {
  columns: TableProps<TDataType>['columns'];
  endpoint: keyof APIPagination;
  loading?: boolean;
  openModal?: ModalWindowProps;
  optionChildren?: ReactNode;
  actions?: Partial<{
    view: (entity: TDataType) => void;
    edit: (enitty: TDataType) => void;
    delete: (entity: TDataType) => void;
  }>
}

const { Header } = Layout;

export function Collection<DataType extends AnyObject>({
  columns,
  endpoint,
  loading = false,
  openModal,
  optionChildren,
}: CollectonProps<DataType>) {
  const { pagination, setPage, setPageSize, loading: apiLoading, data } = usePagination<DataType>(endpoint);
  const [modalOptions, setModalOptions] = useState<ModalWindowProps | void>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [showColumns, setShowColumns] = useState<typeof columns>([]);
  const [options, setOptoins] = useState<Array<{ label: ColumnTitle<DataType>; value?: Key }>>([]);

  const PaginationComponent = <Pagination
    onChange={(p) => onChnageTable({ current: p })}
    hideOnSinglePage={true}
    align="center"
    pageSize={pagination.pageSize}
    current={pagination.page}
    defaultCurrent={pagination.page}
    total={pagination.total}
  />;

  useEffect(() => {
    setModalOptions(openModal);
  }, [openModal]);

  useEffect(() => {
    const names = (columns || []).map(({ key, title }) => ({
      label: title,
      value: key,
    }));

    setOptoins(() => names);
    setCheckedList(() => (columns || []).map(({ key }) => String(key)));
  }, [columns]);

  useEffect(() => {
    setShowColumns(() => (columns || []).map((item) => ({
      ...item,
      hidden: !checkedList.includes(item.key as string),
    })));
  }, [checkedList]);

  return <>
    {modalOptions ?
      <ModalWindow {...modalOptions}>
        {modalOptions.children}
      </ModalWindow>
      : null}
    <Layout>
      <Header>
        <Space>
          <Dropdown menu={getMenuPageSize(setPageSize)} placement="topRight">
            <Button>{pagination.pageSize} records per page</Button>
          </Dropdown>
          {optionChildren}
        </Space>
      </Header>
    </Layout>
    <Divider></Divider>
    <Checkbox.Group
      value={checkedList}
      options={options as CheckboxOptionType[]}
      onChange={setCheckedList}
    />
    <Divider></Divider>
    {PaginationComponent}
    <Table<DataType>
      columns={showColumns}
      dataSource={data?.items ?? []}
      loading={loading || apiLoading}
      onChange={onChnageTable}
      pagination={false}
    // scroll={{ x: 'max-content', y: 55 * 5 }}
    />
    {PaginationComponent}
  </>;

  function onChnageTable({ current }: TablePaginationConfig) {
    setPage(current || 1);
  }
}