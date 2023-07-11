import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Typography } from 'antd';
import firebase from '../src/firebase';
import { Layout } from 'antd';
import TopBar from './component/common/layout/TopBar';
import FooterBar from './component/common/layout/FooterBar';
import CustomSubmitButton from './component/common/button/CustomSubmitButton';
import CustomCardWithImage from './component/common/util/CustomCardWithImage';
import HomePage from './component/Recipe/HomePage';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
        fetchUserData(authUser.uid);
      } else {
        // User is signed out
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const snapshot = await firebase.firestore().collection('users').doc(uid).get();
      if (snapshot.exists) {
        setUserData(snapshot.data());
      } else {
        console.log('User data not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <Layout hasSider={false}>
        <TopBar />
        <br/><br/><br/><br/>
        <CustomCardWithImage>
        <Row align="middle" justify="center">
          <Col align="center">
            <Form
              form={form}
              name="form"
              className="form"
              onFinish={handleLogout}
              layout="vertical"
              requiredMark={false}
            >
              <Title level={1}>WELCOME, {userData && userData.name && userData.name.toUpperCase()}!</Title>
              {userData && (
                <div>
                  <Title level={4}>Profile Information</Title>
                  <p><strong>NAME:</strong> {userData.name}</p>
                  <p><strong>AGE:</strong> {userData.age}</p>
                  <p><strong>DATE OF BIRTH:</strong> {userData.birthday}</p>
                  <p><strong>ROLE:</strong> {userData.role}</p> {/* Display the role */}
                
                </div>
              )}
              <Row justify="space-around" align="middle" className="pt-12">
                <CustomSubmitButton type="primary" htmlType="submit">Logout</CustomSubmitButton>
              </Row>
              <br/><br/><br/><br/>
            </Form>
          </Col>
        </Row>
        </CustomCardWithImage>
        
        <FooterBar />
      </Layout>
    );
  } else {
    return (
      <Layout hasSider={false}>
        <TopBar />
        <br/><br/><br/><br/><br/><br/>
        <CustomCardWithImage>
        <Row align="middle" justify="center">
          <Col align="center">
            <Title level={2}>You are logged out, please login!</Title>
          </Col>
        </Row>
        </CustomCardWithImage>
        <br/><br/><br/><br/><br/><br/>
        <FooterBar />
      </Layout>
    );
  }
};

export default Profile;
