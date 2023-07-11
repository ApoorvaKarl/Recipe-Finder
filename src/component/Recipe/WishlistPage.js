import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Rating from '@mui/material/Rating';
import {Col, Row, Card,Button, Modal} from 'antd';
import FooterBar from '../common/layout/FooterBar';
import TopBar from '../common/layout/TopBar';
import { DeleteOutlined } from '@ant-design/icons';


const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentUser] = useState(null);

  useEffect(() => {

    const currentUser = firebase.auth().currentUser;

    if (currentUser) {

      const firestore = firebase.firestore();
      const wishlistRef = firestore.collection('wishlists').doc(currentUser.uid);
      const unsubscribe = wishlistRef.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          setWishlist(data.recipes || []);
        } else {
          setWishlist([]);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  const handleDeleteFromWishlist = (recipe) => {
    const currentUser = firebase.auth().currentUser;


    if (currentUser) {
      Modal.confirm({
        title: 'Are you sure you want to delete this item?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
      const firestore = firebase.firestore();
      const wishlistRef = firestore.collection('wishlists').doc(currentUser.uid);

      wishlistRef
        .update({
          recipes: firebase.firestore.FieldValue.arrayRemove(recipe),
        })
        .then(() => {
          console.log('Recipe removed from wishlist:', recipe);
          // Add any success message or update state as needed
        })
        .catch((error) => {
          console.error('Error removing recipe from wishlist:', error);
          // Handle error, show error message, etc.
        });
      },
    });
  }
  };

  return (
    <div>
        <TopBar />
      <br/><br/><br/>
      <h2>My Wishlist</h2>
      <div className="card-container">
        {wishlist.map((recipe) => (
          <Row gutter={[16, 16]}>
          <Col key={recipe.id} xs={24} sm={12} md={8} lg={6}>
          <Card
          hoverable
          cover={<img alt={recipe.title} src={recipe.image} />}
          >
           <Card.Meta title={recipe.title} description={`Cooking Time: ${recipe.cookingTime}`} />
                   <br />
                   <Rating name="recipe-rating" value={Number(recipe.rating)} precision={0.1} readOnly />
                   <br />
                   <div style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    shape="circle"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteFromWishlist(recipe)}
                    disabled={currentUser && currentUser.role !== 'admin'}
                    style={{ marginLeft: '8px' }}
                  />
                </div>
                   </Card>
               </Col>
         </Row>
        ))}
      </div>
      
      <FooterBar/>
    </div>
  );
};

export default WishlistPage;
