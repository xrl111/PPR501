import React, { useEffect, useState } from 'react';
import {
  CalendarOutlined,
  ContainerOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ImportOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Layout,
  Menu,
  theme,
  Dropdown,
  MenuProps,
  Space,
  Breadcrumb,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ImportQuiz, CreateExam } from '../components/layouts/index';
import { getMe, logout } from '../apis';
import { useQuery } from '@tanstack/react-query';
import { CreateExamSchedule } from '../components/layouts/CreateExamSchedule';
import { findBreadcrumbLabels } from '../utils';

const { Header, Sider, Content } = Layout;

const siderItems: MenuProps['items'] = [
  {
    key: 'sub1',
    icon: <FolderOpenOutlined />,
    label: 'Quản lý câu hỏi',
    children: [
      {
        key: '1',
        icon: <ImportOutlined />,
        label: 'Tạo câu hỏi',
      },
    ],
  },
  {
    key: 'sub2',
    icon: <FolderOpenOutlined />,
    label: 'Quản lý đề thi',
    children: [
      {
        key: '2',
        icon: <ContainerOutlined />,
        label: 'Tạo đề thi',
      },
    ],
  },
  {
    key: 'sub3',
    icon: <FolderOpenOutlined />,
    label: 'Quản lý lịch thi',
    children: [
      {
        key: '3',
        icon: <CalendarOutlined />,
        label: 'Tạo lịch thi',
      },
    ],
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

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: data?.username || 'Unknown',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '1',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(() => {
    return localStorage.getItem('selectedMenuItem') || '1';
  });

  useEffect(() => {
    localStorage.setItem('selectedMenuItem', selectedMenuItem);
  }, [selectedMenuItem]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuItem(e.key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <ImportQuiz />;
      case '2':
        return <CreateExam />;
      case '3':
        return <CreateExamSchedule />;
      default:
        return <div>Default Content</div>;
    }
  };

  const handleDropdownClick = ({ key }: { key: string }) => {
    switch (key) {
      case '1':
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
    background: '#fff',
    color: '#000',
  };

  const headerCSS: React.CSSProperties = {
    padding: 0,
    background: '#fff',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    borderBottom: '1px solid #cfcfcf',
  };

  const avatarCSS: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
    marginRight: '16px',
    border: '1px solid black',
  };

  const generateBreadcrumbItems = () => {
    const labels = findBreadcrumbLabels(selectedMenuItem, siderItems);
    return [
      { title: <HomeOutlined /> },
      ...labels.map((label) => ({ title: label })),
    ];
  };
  return (
    <Layout style={layoutCSS}>
      <Header style={headerCSS}>
        <Dropdown menu={{ items, onClick: handleDropdownClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar style={avatarCSS} icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Header>

      <Layout>
        <Sider theme="light">
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            items={siderItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Breadcrumb
            style={{ margin: '16px 0', padding: '0 24px', fontSize: 16 }}
            items={generateBreadcrumbItems()}
          />

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
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
