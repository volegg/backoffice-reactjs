import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { TransactionList } from "./TransactionList/TransactionList";

type PageTransactionsProps = {
  endpoint: 'transactions' | 'transactionsMy';
}

export function PageTransactions({ endpoint }: PageTransactionsProps) {
  const { data, fetch, loading } = useApi(endpoint);

  useEffect(() => {
    fetch();
  }, []);

  return <TransactionList data={data ?? []} loading={loading} />;
}