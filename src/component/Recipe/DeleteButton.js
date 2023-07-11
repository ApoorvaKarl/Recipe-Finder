import { Modal } from 'antd';
import { firestore,auth } from '../../firebase';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react';

const { confirm } = Modal;
const DeleteButton = ({ recipe }) => {
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleDeleteRecipe = (recipe) => {
    confirm({
      title: 'Are you sure you want to delete this recipe?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (currentUser && currentUser.role === 'admin') {
          firestore
            .collection('recipes')
            .doc(recipe.id)
            .delete()
            .then(() => {
              fetchRecipes();
            })
            .catch((error) => {
              console.error('Error deleting recipe:', error);
            });
        } else {
          console.log('You do not have permission to delete this recipe.');
        }
      },
    });
  };

  return (
    <Button
      type="primary"
      shape="circle"
      danger
      icon={<DeleteOutlined />}
      onClick={() => handleDeleteRecipe(recipe)}
      disabled={currentUser && currentUser.role !== 'admin'}
      style={{ marginLeft: '8px' }}
    />
  );
};

export default DeleteButton;
