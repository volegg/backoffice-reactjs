import { useEffect, useState } from 'react';
import { APIPagination, useApi } from './useApi';

type PaginationProps = { page: number; pageSize: number; total: number };

export function usePagination<TForceDataType>(endpoint: keyof APIPagination) {
  const { data, request: fetch, loading } = useApi(endpoint);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    pageSize: 10,
    total: 1,
  });

  useEffect(() => {
    fetch({ page, limit: pagination.pageSize });
  }, [page]);

  useEffect(() => {
    if (data) {
      setPagination({
        page: data.page,
        pageSize: data.limit,
        total: data.total,
      });
    }
  }, [data]);

  return { pagination, setPage, setPageSize, data: data as unknown as Paginatted<TForceDataType>, fetch, loading };

  function setPageSize(pageSize: number) {
    let maxPage = pagination.page;

    if (pagination.total > pagination.pageSize) {
      const calcPage = Math.ceil(pagination.total / pageSize);

      if (pagination.page > calcPage) {
        maxPage = calcPage;
      }
    }

    setPagination(() => ({
      pageSize,
      total: pagination.total,
      page: maxPage,
    }));

    if (maxPage === pagination.page) {
      fetch({ page, limit: pageSize });
    } else {
      setPage(() => maxPage);
    }
  }
}