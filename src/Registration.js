import React, { useState } from 'react';
import { Col, Form, Row, Input, Select } from 'antd';
import firebase from '../src/firebase';
import PasswordTextBox from './component/common/text-box/PasswordTextBox';
import CustomSubmitButton from './component/common/button/CustomSubmitButton';
import InlineErrorMessage from './component/common/util/InlineErrorMessage';
import CustomCardWithImage from './component/common/util/CustomCardWithImage';
import TopBar from './component/common/layout/TopBar';
import FooterBar from './component/common/layout/FooterBar';
import { UserOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';
import { ThunderboltOutlined } from '@ant-design/icons';
import { CalendarOutlined } from '@ant-design/icons';

const { Option } = Select;

const Registration = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const handleRegistration = async (values) => {
    try {
      setError(null);
      const { email, password, name, age, birthday, role } = values;

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;

      const userDocRef = firebase.firestore().collection('users').doc(currentUser.uid);
      await userDocRef.set({
        name: name,
        age: age,
        birthday: birthday,
        role: role,
      });

      
      const userRole = role; 
      if (userRole === 'admin') {

      } else if (userRole === 'user') {
      }

      console.log('User registered successfully');
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Firebase error:', error.code, error.message);
    }
  };


  return (
    <div>
      <TopBar />
      <br/><br/><br/><br/><br/>
      <Row align="middle" justify="center">
        <Col align="center">
          <CustomCardWithImage>
            <InlineErrorMessage message={error} />
            <Form
              form={form}
              onFinish={handleRegistration}
              className="form"
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  type="text"
                  prefix={<SmileOutlined />}
                  
                  placeholder="Name"
                  autoFocus={true}
                  className="ant-input-affix-wrapper"
                  style={{ borderRadius: '2px' }}
                />
              </Form.Item>
              <Form.Item
                name="age"
                rules={[{ required: true, message: 'Please enter your age' }]}
              >
                <Input
                  type="number"
                  prefix={<ThunderboltOutlined />}
                  
                  placeholder="Age"
                  autoFocus={true}
                  className="ant-input-affix-wrapper"
                  style={{ borderRadius: '2px' }}
                />
              </Form.Item>
              <Form.Item
                name="birthday"
                rules={[{ required: true, message: 'Please enter your birthday' }]}
              >
                <Input
                  type="date"
                  prefix={<CalendarOutlined />}
                  
                  placeholder="Birthday"
                  autoFocus={true}
                  className="ant-input-affix-wrapper"
                  style={{ borderRadius: '2px' }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  autoFocus={true}
                  autoComplete="off"
                  style={{ borderRadius: '2px' }}
                />
              </Form.Item>
              <PasswordTextBox
                name="password"
                type="password"
                placeholder="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              />
              <Form.Item
                name="role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select
                  placeholder="Select a role"
                  style={{ borderRadius: '2px' }}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
              <Row justify="space-around" align="middle" className="pt-12">
                <CustomSubmitButton type="primary" htmlType="submit">Register</CustomSubmitButton>
              </Row>
              {error && <p>{error}</p>}
            </Form>
          </CustomCardWithImage>
        </Col>
      </Row>
      <br/><br/><br/><br/><br/>
      <FooterBar/>
    </div>
  );
};

export default Registration;
