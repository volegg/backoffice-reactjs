import { Routes, Route } from 'react-router';
import { AdminLayout } from '../layout/AdminLayout';
import { UserProfile } from '../component/UserProfile/UserProfile';
import { AppRoute } from '../const/routes';
import { PageUsers } from '../component/Page/PageUsers';
import { PageTransactions } from '../component/Page/PageTransactions';
import { usePermissionCheck } from '../hooks/usePermissionAccess';

export function AdminRoutes() {
  const hasTransactionRead = usePermissionCheck('transaction:view');
  const hasProfileTransactionRead = usePermissionCheck('profile:transactions');
  const hasUserRead = usePermissionCheck('user:view');

  console.log("tr", hasProfileTransactionRead);

  return <AdminLayout>
    <Routes>
      <Route index element={<UserProfile />} />
      <Route path={AppRoute.profile} element={<UserProfile />}></Route>
      {hasProfileTransactionRead ? <Route path={AppRoute.myTransactions} element={<PageTransactions endpoint="transactionsMy" />}></Route> : null}
      {hasUserRead ? <Route path={AppRoute.users} element={<PageUsers />}></Route> : null}
      {hasTransactionRead ? <Route path={AppRoute.transactions} element={<PageTransactions endpoint="transactions" />}></Route> : null}
    </Routes>
  </AdminLayout >
}
