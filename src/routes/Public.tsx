import { Route, Routes } from 'react-router';
import { AuthLayout } from '../layout/AuthLayout';
import { AppRoute } from '../const/routes';
import { AuthComponent } from '../component/AuthComponent';
import { AuthType } from '../const/auth';

export function PublicRoutes() {
  return <AuthLayout>
    <Routes>
      <Route index element={<AuthComponent type={AuthType.login} />} />
      <Route path={AppRoute.login} element={<AuthComponent type={AuthType.login} />} />
      <Route path={AppRoute.singup} element={<AuthComponent type={AuthType.signup} />} />
    </Routes>
  </AuthLayout>
}
