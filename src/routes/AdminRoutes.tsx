import { Route, Routes } from "react-router";
import { AdminLayout } from "../layout/AdminLayout";
import { UserProfile } from "../component/UserProfile/UserProfile";
import { AppRoute } from "../const/routes";
import { PageUsers } from "../component/PageUsers";
import { PageTransactions } from "../component/PageTransactions";

export function AdminRoutes() {
  return <AdminLayout>
    <Routes>
      <Route index element={<UserProfile />} />
      <Route path={AppRoute.profile} element={<UserProfile />}></Route>
      <Route path={AppRoute.users} element={<PageUsers />}></Route>
      <Route path={AppRoute.transactions} element={<PageTransactions endpoint="transactions" />}></Route>
    </Routes>
  </AdminLayout>
}