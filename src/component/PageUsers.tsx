import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import type { Transaction, User } from "../api/types";
import { ModalWindow } from "./ModalWindow";
import { UserView } from "./UserView/UserView";
import { Button, Dropdown, type TablePaginationConfig } from "antd";
import { usePagination } from "../hooks/pagination";
import { getMenuPageSize } from "./MenuItemComponent";
import { UserList } from "./UserList/UserList";

export function PageUsers() {
  const { page, limit, setLimit, fetch, loading, data, setPage } = usePagination<User>('users');
  const { data: deleteData, fetch: deleteDoc } = useApi('deleteUser');
  const [userToView, setUserToView] = useState<User | void>();
  const [deleteId, setDeleteId] = useState<string | void>();

  useEffect(() => {
    if (deleteId) {
      fetch({ page, limit });
      setDeleteId();
    }
  }, [deleteId, page, limit]);

  return <>
    {userToView ?
      <ModalWindow open={!!userToView} title={`User profile ${userToView.email}`} handleOk={handleOk}><UserView user={userToView} /></ModalWindow> : null}
    <Dropdown menu={getMenuPageSize(onLimitClick)} placement="topRight">
      <Button>{limit} records per page</Button>
    </Dropdown>
    {data
      ? <UserList
        data={data.items ?? []}
        loading={loading}
        selectUser={selectUser}
        deleteClick={deleteClick}
        pagination={{ page: data.page, pageSize: data.limit, total: data.total }}
        onChangeTable={onChnageTable}
      />
      : null}
  </>;

  function onLimitClick(newLimit) {
    setLimit(newLimit);
  }

  function selectUser(user: User) {
    setUserToView(user);
  }

  function handleOk() {
    setUserToView();
  }

  function onChnageTable(paginationConfig: TablePaginationConfig) {
    setPage(paginationConfig.current ?? 1);
  }

  function deleteClick(data: User) {
    deleteDoc(data._id);
    setDeleteId(data._id);
  }


}