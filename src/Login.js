import React from 'react';
import { Col, Form, Row, Input } from 'antd';
import { useState } from 'react';
import firebase from '../src/firebase';
import UserNameTextBox from './component/common/text-box/UserNameTextBox';
import PasswordTextBox from './component/common/text-box/PasswordTextBox';
import CustomSubmitButton from './component/common/button/CustomSubmitButton';
import InlineErrorMessage from './component/common/util/InlineErrorMessage';
import CustomCardWithImage from './component/common/util/CustomCardWithImage';
import PublicPageStyle from './styles/common/PublicPageStyle';
import { UserOutlined } from '@ant-design/icons';

const Login = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (values) => {
    try {
      setError(null);
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
      window.location.href = '/profile';
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Firebase error:', error.code, error.message);
    }
  };

  return (
    <PublicPageStyle>
      <Row align="middle" justify="center">
        <Col align="center">
          <CustomCardWithImage>
            <InlineErrorMessage message={error} />
            <Form
              form={form}
              name="form"
              className="form"
              onFinish={handleLogin}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please enter your email' }]}
                hasFeedback={true}
                validateFirst={true}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  autoFocus={true}
                  autoComplete="off"
                  className="ant-input-affix-wrapper"
                  style={{ borderRadius: '2px' }}
                />
              </Form.Item>
              <PasswordTextBox
                name="password"
                type="password"
                placeholder="Password"
              />
              <Row justify="space-around" align="middle" className="pt-12">
                <CustomSubmitButton type="primary" htmlType="submit">Login</CustomSubmitButton>
              </Row>
            </Form>
          </CustomCardWithImage>
        </Col>
      </Row>
    </PublicPageStyle>
  );
};

export default Login;
