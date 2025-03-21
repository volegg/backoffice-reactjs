import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import type { User } from "../api/types";
import { ModalWindow } from "./ModalWindow";
import { UserView } from "./UserView/UserView";
import { Layout, Space, Button, Dropdown, type TablePaginationConfig } from "antd";
import { usePagination } from "../hooks/pagination";
import { getMenuPageSize } from "./MenuItemComponent";
import { UserList } from "./UserList/UserList";
import { CreateUser } from "./CreateUser/CreateUser";

const { Header } = Layout;

// todo: create factory component to handle full same logic
export function PageUsers() {
  const { page, limit, setLimit, fetch, loading, data, setPage } = usePagination<User>('users');
  const { data: deleteData, fetch: deleteDoc } = useApi('deleteUser');
  const [userToView, setUserToView] = useState<User | void>();
  const [openCreateUser, setOpenCreate] = useState(false);
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
    {openCreateUser ?
      <ModalWindow open={!!openCreateUser} title={`Create user`} handleOk={handleCreateOk} onClose={() => setOpenCreate(false)} withFooter={false}><CreateUser submmitHandler={() => setOpenCreate(false)} /></ModalWindow> : null}
    <Layout>
      <Header>
        <Space>
          <Dropdown menu={getMenuPageSize(onLimitClick)} placement="topRight">
            <Button>{limit} records per page</Button>
          </Dropdown>
          <Button type='primary' onClick={() => setOpenCreate(true)}>Create</Button>
        </Space>
      </Header>
    </Layout>

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

  function handleCreateOk() {
    setOpenCreate(false);
  }

  function deleteClick(data: User) {
    deleteDoc(data._id);
    setDeleteId(data._id);
  }


}