import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { UserList } from "./UserList/UserList";

export function PageUsers() {
  const { data, fetch, loading } = useApi('users');

  useEffect(() => {
    fetch();
  }, []);

  return <UserList data={data ?? []} loading={loading} />;
}