import { useState, useCallback } from "react";
import { api } from "../api/api";
import { toCommonError } from "../utils/errorCommon";

type GetOptionType<T> = T extends (first: infer FirstArgument) => AnyType ? FirstArgument : never;

type API = {
  me: GetOptionType<typeof api.me>;
  updateMe: GetOptionType<typeof api.updateMe>;
  users: GetOptionType<typeof api.users>;
  transactions: GetOptionType<typeof api.transactions>;
  transactionsMy: GetOptionType<typeof api.transactionsMy>;
}

type APIReturn = {
  me: ReturnType<typeof api.me>;
  updateMe: ReturnType<typeof api.updateMe>;
  users: ReturnType<typeof api.users>;
  transactions: ReturnType<typeof api.transactions>;
  transactionsMy: ReturnType<typeof api.transactionsMy>;
}

export function useApi<TAlias extends keyof API>(alias: TAlias) {
  const [error, setError] = useState<CommonError | void>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Awaited<APIReturn[TAlias]>>();

  const fetch = useCallback(async (options: API[TAlias]) => {
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
    }
  }, []);

  return { data, loading, error, fetch, setError };
}
