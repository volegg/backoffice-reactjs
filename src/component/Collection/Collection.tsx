import { useEffect, useState, type ReactNode } from 'react';
import { Layout, Space, Button, Dropdown, Table, type TablePaginationConfig, type TableProps } from 'antd';
import { getMenuPageSize } from '../MenuItemComponent';
import { ModalWindow, type ModalWindowProps } from '../ModalWindow';
import { usePagination } from '../../hooks/pagination';
import type { APIPagination } from '../../hooks/useApi';
import { AnyObject } from 'antd/es/_util/type';

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
  const { pagination, setPagination, setPageSize, fetch, loading: apiLoading, data } = usePagination<DataType>(endpoint);
  const [modalOptions, setModalOptions] = useState<ModalWindowProps | void>();

  useEffect(() => {
    fetch({ page: pagination.page, limit: pagination.pageSize });
  }, [pagination]);

  useEffect(() => {
    setModalOptions(openModal);
  }, [openModal]);

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
    <Table<DataType>
      columns={columns}
      dataSource={data?.items ?? []}
      loading={loading || apiLoading}
      pagination={pagination}
      onChange={onChnageTable}
    />
  </>;

  function onChnageTable({ current, pageSize, total }: TablePaginationConfig) {
    setPagination({
      total: total || 1,
      pageSize: pageSize || 1,
      page: current || 1,
    });
  }
}