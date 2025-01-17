import React, { useEffect } from 'react';
import { Layout, Typography, Button, Flex, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import quizz from '../assets/Quizz.jpg';
import { createStyles } from 'antd-style';
import { isValidToken } from '../utils';
const { Content } = Layout;
const { Title } = Typography;
const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const LayoutStyle: React.CSSProperties = {
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  position: 'relative',
  zIndex: 1,
  height: '100%',
  width: '100%',
};
const BackgroundStyle: React.CSSProperties = {
  backgroundImage: `url(${quizz})`,
  height: '100%',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  filter: 'blur(8px) brightness(50%)',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
};
const ContainerStyle: React.CSSProperties = {
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
};

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
const HeroSession: React.FC = () => {
  const navigate = useNavigate();
  const { styles } = useStyle();

  useEffect(() => {
    if (isValidToken()) {
      navigate('/main');
    }
  }, [navigate]);
  const handleNavigate = (navItem: string) => {
    if (navItem === 'login') {
      navigate('/login');
    }
  };
  return (
    <div style={ContainerStyle}>
      <div style={BackgroundStyle}></div>
      <Layout style={LayoutStyle}>
        <Content style={contentStyle}>
          <Flex vertical justify="center" align="center">
            <Title level={1} style={{ color: 'white' }}>
              Welcome to the QuizNova
            </Title>
            <Flex gap="20px" justify="center" align="center">
              <ConfigProvider
                button={{
                  className: styles.linearGradientButton,
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleNavigate('login')}
                >
                  Start Quizz
                </Button>
              </ConfigProvider>
            </Flex>
          </Flex>
        </Content>
      </Layout>
    </div>
  );
};

export default HeroSession;
