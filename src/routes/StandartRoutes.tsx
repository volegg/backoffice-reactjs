import { Route, Routes } from "react-router";
import { StandarLayout } from "../layout/StandarLayout";
import { AppRoute } from "../const/routes";
import { UserProfile } from "../component/UserProfile/UserProfile";
import { PageTransactions } from "../component/PageTransactions";

export function StandartRoutes() {
  return <StandarLayout>
    <Routes>
      <Route index element={<UserProfile />} />
      <Route path={AppRoute.profile} element={<UserProfile />}></Route>
      <Route path={AppRoute.transactions} element={<PageTransactions endpoint="transactionsMy" />}></Route>
    </Routes>
  </StandarLayout>
}