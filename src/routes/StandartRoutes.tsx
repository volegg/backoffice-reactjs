import { Route, Routes } from 'react-router';
import { StandarLayout } from '../layout/StandarLayout';
import { AppRoute } from '../const/routes';
import { UserProfile } from '../component/UserProfile/UserProfile';
import { PageTransactions } from '../component/Page/PageTransactions';
import { usePermissionCheck } from '../hooks/usePermissionAccess';

export function StandartRoutes() {
  const hasTransactionRead = usePermissionCheck('profile:transactions');

  return <StandarLayout>
    <Routes>
      <Route index element={<UserProfile />} />
      <Route path={AppRoute.profile} element={<UserProfile />}></Route>
      {hasTransactionRead ? <Route path={AppRoute.myTransactions} element={<PageTransactions endpoint="transactionsMy" />}></Route> : null}
    </Routes>
  </StandarLayout>
}