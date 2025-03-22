import { Layout, Menu, MenuProps, theme } from 'antd';
import { useNavigate } from 'react-router';
import { LayoutProps } from './types';
import { MenuItem, MenuLogout, MenuMyTransactions, MenuProfile } from '../component/MenuItemComponent';
import { useLogout } from '../hooks/useLogout';
import { AppRoute } from '../const/routes';
import { usePermissionCheck } from '../hooks/usePermissionAccess';

const { Header, Content, Footer } = Layout;

export function StandarLayout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const hasAccessProfile = usePermissionCheck('profile:view');
  const hasAccessProfileTransactions = usePermissionCheck('profile:transactions');

  const menuItems: MenuItem[] = [];

  if (hasAccessProfile) {
    menuItems.push(MenuProfile);
  }

  if (hasAccessProfileTransactions) {
    menuItems.push(MenuMyTransactions);
  }

  menuItems.push(MenuLogout);

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === AppRoute.logout) {
      logout();

      return;
    }

    navigate(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          onClick={onClick}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content>
        <div
          style={{
            height: '100dvh',
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}