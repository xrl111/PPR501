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
  Typography,
  Flex,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { getMe, logout } from '../apis';
import { useQuery } from '@tanstack/react-query';
import { findBreadcrumbLabels, isValidToken } from '../utils';
import logo from '../assets/Logo.jpg';
import { GetExams, GetQuiz, GetExamSchedule } from '../components/organisims';

const { Header, Sider, Content } = Layout;

const siderItems: MenuProps['items'] = [
  {
    key: 'sub1',
    icon: <FolderOpenOutlined />,
    label: 'Quản lý đề thi',
    children: [
      {
        key: '1',
        icon: <ContainerOutlined />,
        label: 'Danh sách đề thi',
      },
    ],
  },
  {
    key: 'sub2',
    icon: <FolderOpenOutlined />,
    label: 'Quản lý lịch thi',
    children: [
      {
        key: '2',
        icon: <CalendarOutlined />,
        label: 'Danh sách lịch thi',
      },
    ],
  },
  {
    key: 'sub3',
    icon: <FolderOpenOutlined />,
    label: 'Quản lý câu hỏi',
    children: [
      {
        key: '3',
        icon: <ImportOutlined />,
        label: 'Danh sách câu hỏi',
      },
    ],
  },
];

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidToken()) {
      navigate('/login');
    }
  }, [navigate]);

  const { data: userData } = useQuery({
    queryKey: ['data'],
    queryFn: getMe,
    retry: false,
  });

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: userData?.user.username || 'Unknown',
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
        return <GetExams />;
      case '2':
        return <GetExamSchedule />;
      case '3':
        return <GetQuiz />;
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
    minHeight: '100vh',
    background: '#fff',
    color: '#000',
  };

  const headerCSS: React.CSSProperties = {
    padding: 0,
    margin: 10,
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  const logoStyle: React.CSSProperties = {
    width: 70,
    height: 50,
    marginRight: 16,
    marginLeft: 16,
  };
  return (
    <Layout style={layoutCSS}>
      <Header style={headerCSS}>
        <Flex
          align="center"
          onClick={() => {
            setSelectedMenuItem('1');
          }}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="logo" style={logoStyle} />
          <Typography.Text
            style={{
              color: 'black',
              textTransform: 'uppercase',
              fontWeight: 700,
              fontSize: 30,
            }}
          >
            QuizNova
          </Typography.Text>
        </Flex>
        <Dropdown menu={{ items, onClick: handleDropdownClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar style={avatarCSS} icon={<UserOutlined />} size="large" />
            </Space>
          </a>
        </Dropdown>
      </Header>
      <div style={{ borderBottom: '1px solid #cfcfcf' }} />
      <Layout>
        <Sider theme="light" width={250}>
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
