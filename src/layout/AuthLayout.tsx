import { Layout, LayoutProps, Typography } from 'antd';
import { Link } from 'react-router';
import { AppRoute } from '../const/routes';

import './AuthLayout.css';

const { Title } = Typography;

export function AuthLayout({ children }: LayoutProps) {
  return <Layout>
    <div className="auth-wrapper">
      <Title level={1}>
        BACKOFFICE
      </Title>
      <div className="auth-type">
        <Link to={AppRoute.login}>Login</Link> | <Link to={AppRoute.singup}>Sign Up</Link>
        <hr />
      </div>
      <div className="auth-component">
        {children}
      </div>
    </div>
  </Layout>
}
