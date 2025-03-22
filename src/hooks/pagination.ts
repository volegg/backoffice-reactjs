import { useEffect, useState } from "react";
import { APIPagination, useApi } from "./useApi";

type PaginationProps = { page: number; pageSize: number; total: number };

export function usePagination<TForceDataType>(endpoint: keyof APIPagination) {
  const { data, fetch, loading } = useApi(endpoint);
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    pageSize: 10,
    total: 10,
  });
  const [lastTotal, setLastTotal] = useState(0);

  useEffect(() => {
    fetch({ page: pagination.page, limit: pagination.pageSize });
  }, [pagination]);

  useEffect(() => {
    if (data && 'total' in data) {
      setLastTotal(data.total);
    }
  }, [data]);

  return { pagination, setPagination, setPageSize, data: data as unknown as Paginatted<TForceDataType>, fetch, loading };

  function setPageSize(value: number) {
    let maxPage = pagination.page;

    if (lastTotal > pagination.pageSize) {
      const calcPage = Math.ceil(lastTotal / value);

      if (pagination.page > calcPage) {
        maxPage = calcPage;
      }
    }

    setPagination({
      pageSize: value,
      total: lastTotal,
      page: maxPage,
    });
  }
}