import { useEffect, useState } from "react";
import { type API, APIPagination, useApi } from "./useApi";

export function usePagination<TForceDataType extends Object>(endpoint: keyof APIPagination) {
  const { data, fetch, loading } = useApi(endpoint);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch({ page, limit });
  }, [page, limit]);

  return { page, limit, setPage, setLimit, data: data as unknown as Paginatted<TForceDataType>, fetch, loading };
}