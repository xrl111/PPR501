import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, message } from 'antd';
import background from '../assets/wp6774751.jpg';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse, LoginData, LoginResponse } from '../types';
import { login } from '../apis';
import { useMutation } from '@tanstack/react-query';
const { Title } = Typography;

const formStyle: React.CSSProperties = {
  maxWidth: 360,
  width: '100%',
  border: '1px solid #d9d9d9',
  padding: 24,
  borderRadius: 8,
  zIndex: 1,
  position: 'relative',
  background: 'white',
  color: 'black',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  position: 'relative',
  zIndex: 1,
  height: '100%',
  width: '100%',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  position: 'relative',
};

const backgroundStyle: React.CSSProperties = {
  background: `url(${background}) no-repeat center center fixed`,
  height: '100%',
  width: '100%',
  filter: 'blur(8px) brightness(50%)',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('username')) {
      navigate('/main');
    }
  });
  const [messageApi, contextHolder] = message.useMessage();
  const mutation = useMutation<LoginResponse, ErrorResponse, LoginData>({
    mutationFn: login,
    onSuccess: () => {
      navigate('/main');
    },
    onError: (error: ErrorResponse) => {
      messageApi.open({
        type: 'error',
        content: `
          ${error?.response?.data?.error}
        `,
      });
    },
  });
  const onFinish = async (values: LoginData) => {
    mutation.mutate(values);
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <div style={formWrapperStyle}>
        {contextHolder}
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={formStyle}
          onFinish={onFinish}
        >
          <Title level={2} style={{ textAlign: 'center' }}>
            LOGIN
          </Title>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
