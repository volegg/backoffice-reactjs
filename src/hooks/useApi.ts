import { useState, useCallback, useRef } from 'react';
import { api } from '../api/api';
import { toCommonError } from '../utils/errorCommon';

type GetOptionType<T> = T extends (first: infer FirstArgument) => AnyType ? FirstArgument : never;

export type API = {
  me: GetOptionType<typeof api.me>;
  updateMe: GetOptionType<typeof api.updateMe>;
  users: GetOptionType<typeof api.users>;
  transactions: GetOptionType<typeof api.transactions>;
  transactionsMy: GetOptionType<typeof api.transactionsMy>;
  deleteTransaction: GetOptionType<typeof api.deleteTransaction>;
  deleteUser: GetOptionType<typeof api.deleteUser>;
  createUser: GetOptionType<typeof api.createUser>;
  createAdmin: GetOptionType<typeof api.createAdmin>;
}

export type APIPagination = Pick<API, 'transactions' | 'transactionsMy' | 'users'>

type APIReturn = {
  me: ReturnType<typeof api.me>;
  updateMe: ReturnType<typeof api.updateMe>;
  users: ReturnType<typeof api.users>;
  transactions: ReturnType<typeof api.transactions>;
  transactionsMy: ReturnType<typeof api.transactionsMy>;
  deleteTransaction: ReturnType<typeof api.deleteTransaction>;
  deleteUser: ReturnType<typeof api.deleteUser>;
  createUser: ReturnType<typeof api.createUser>;
  createAdmin: ReturnType<typeof api.createAdmin>;
}

export function useApi<TAlias extends keyof API>(alias: TAlias) {
  const isExec = useRef(false);
  const [error, setError] = useState<CommonError | void>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Awaited<APIReturn[TAlias]>>();

  const fetch = useCallback(async (options: API[TAlias]) => {
    if (!isExec.current) {
      isExec.current = true;
      setLoading(true);
      setError();

      try {
        // @ts-ignore
        const result = await (api[alias](options) as APIReturn[TAlias]);

        setData(result);

      } catch (ex) {
        setError(toCommonError(ex));
      } finally {
        setLoading(false);
        isExec.current = false;
      }
    }
  }, [alias]);

  return { data, loading, error, fetch, setError };
}
