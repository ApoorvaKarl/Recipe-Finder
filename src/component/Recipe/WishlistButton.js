import React from 'react';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { firestore,auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import {  Button } from 'antd';

const WishlistButton = ({ recipe }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log('Fetching recipes...');
    fetchRecipes();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      if (user) {
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              setCurrentUser({ ...user, role: userData.role });
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchRecipes = async () => {
    try {
      const recipesRef = firestore.collection('recipes');
      const snapshot = await recipesRef.get();
      console.log('Snapshot:', snapshot);

      const recipesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('Recipes Data:', recipesData);

      setRecipes(recipesData);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  const handleAddToWishlist = () => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      const firestore = firebase.firestore();
      const wishlistRef = firestore.collection('wishlists').doc(currentUser.uid);

      wishlistRef
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) {
            return wishlistRef.set({ recipes: [] });
          }
        })
        .then(() => {
          return wishlistRef.update({
            recipes: firebase.firestore.FieldValue.arrayUnion(recipe),
          });
        })
        .then(() => {
          console.log('Recipe added to wishlist:', recipe);
          navigate('/wishlist');
          // Add any navigation or success message here
        })
        .catch((error) => {
          console.error('Error adding recipe to wishlist:', error);
          // Handle error, show error message, etc.
        });
    }
  };

  return (
    <Button
      type="primary"
      danger
      shape="circle"
      icon={<HeartFilled style={{ color: 'orange' }} />}
      onClick={handleAddToWishlist}
      disabled={currentUser && currentUser.role !== 'user'}
      style={{ marginLeft: '8px' }}
    />
  );
};

export default WishlistButton;
