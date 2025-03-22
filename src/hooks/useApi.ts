import { useState, useCallback, useRef } from 'react';
import { api } from '../api/api';
import { toCommonError } from '../utils/errorCommon';

type GetOptionType<T> = T extends (first: infer FirstArgument) => AnyType ? FirstArgument : never;

export type API = {
  me: GetOptionType<typeof api.me>;
  updateMe: GetOptionType<typeof api.updateMe>;
  deleteMe: GetOptionType<typeof api.deleteMe>;
  transactionsMy: GetOptionType<typeof api.transactionsMy>;

  users: GetOptionType<typeof api.users>;
  transactions: GetOptionType<typeof api.transactions>;
  deleteTransaction: GetOptionType<typeof api.deleteTransaction>;
  deleteUser: GetOptionType<typeof api.deleteUser>;
  createUser: GetOptionType<typeof api.createUser>;
  createAdmin: GetOptionType<typeof api.createAdmin>;
}

export type APIPagination = Pick<API, 'transactions' | 'transactionsMy' | 'users'>

type APIReturn = {
  me: ReturnType<typeof api.me>;
  updateMe: ReturnType<typeof api.updateMe>;
  deleteMe: ReturnType<typeof api.deleteMe>;
  transactionsMy: ReturnType<typeof api.transactionsMy>;

  transactions: ReturnType<typeof api.transactions>;
  deleteTransaction: ReturnType<typeof api.deleteTransaction>;
  users: ReturnType<typeof api.users>;
  deleteUser: ReturnType<typeof api.deleteUser>;
  createUser: ReturnType<typeof api.createUser>;
  createAdmin: ReturnType<typeof api.createAdmin>;
}

export function useApi<TAlias extends keyof API>(alias: TAlias) {
  const isExec = useRef(false);
  const [error, setError] = useState<CommonError | void>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Awaited<APIReturn[TAlias]>>();

  const request = useCallback(async (options: API[TAlias]) => {
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

  return { data, loading, error, request, setError };
}
