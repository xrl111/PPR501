import React, { useEffect, useState } from 'react';
import {
  CalendarOutlined,
  ContainerOutlined,
  ImportOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Layout,
  Menu,
  theme,
  Dropdown,
  MenuProps,
  Space,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ImportQuiz } from '../components/layouts/index';
import { getMe, logout } from '../apis';
import { useQuery } from '@tanstack/react-query';

const { Header, Sider, Content, Footer } = Layout;

const siderItems = [
  {
    key: '1',
    icon: <ImportOutlined />,
    label: 'Nhập đề',
  },
  {
    key: '2',
    icon: <ContainerOutlined />,
    label: 'Tạo đề thi',
  },
  {
    key: '3',
    icon: <CalendarOutlined />,
    label: 'Tạo lịch thi',
  },
];

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem('accessToken') ||
      !localStorage.getItem('refreshToken') ||
      !localStorage.getItem('username')
    ) {
      navigate('/login');
    }
  }, [navigate]);

  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: getMe,
    retry: false,
  });

  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuItem(e.key);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: data?.username || 'Unknown',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <ImportQuiz />;
      case '2':
        return <div>Content for nav 2</div>;
      case '3':
        return <div>Content for nav 3</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  const handleDropdownClick = ({ key }: { key: string }) => {
    switch (key) {
      case '2':
        console.log('Settings');
        break;
      case '3':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken') &&
      localStorage.getItem('username')
    ) {
      logout();
      navigate('/login');
    }
  };

  const layoutCSS: React.CSSProperties = {
    height: '100vh',
  };
  const logoCSS: React.CSSProperties = {
    height: '32px',
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '16px',
  };
  const footerCSS: React.CSSProperties = {
    textAlign: 'center',
  };
  const headerCSS: React.CSSProperties = {
    padding: 0,
    background: colorBgContainer,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const avatarCSS: React.CSSProperties = {
    backgroundColor: 'rgb(101, 147, 184)',
    marginRight: '16px',
  };

  return (
    <Layout style={layoutCSS}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={logoCSS} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={siderItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={headerCSS}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items, onClick: handleDropdownClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar style={avatarCSS} icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
        <Footer style={footerCSS}>
          Quizz Master ©{new Date().getFullYear()} Created by Team 2
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainPage;
