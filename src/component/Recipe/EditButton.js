import { firestore } from '../../firebase';
import {  Button,Modal } from 'antd';
import { EditOutlined,PlusOutlined,DeleteOutlined } from '@ant-design/icons';
import firebase from 'firebase/compat/app';

export const addRecipe = (setModalVisible,currentUser, setEditMode, setSelectedRecipe) => {
    const handleAddRecipe = () => {
        const currentUser = firebase.auth().currentUser;
    
        if (currentUser) {
    setEditMode(false);
  setSelectedRecipe(null);
  setModalVisible(true);
        }
    };
  return(
    <Button type="primary" icon={<PlusOutlined />} disabled={currentUser && currentUser.role !== 'admin'} onClick={handleAddRecipe}>
        Add Recipe
              </Button>
  );
};

export const editRecipe = (recipe,currentUser, setModalVisible, setEditMode, setSelectedRecipe) => {
    const handleEditRecipe = () => {
        const currentUser = firebase.auth().currentUser;
    
        if (currentUser) {
    setEditMode(true);
  setSelectedRecipe(recipe);
  setModalVisible(true);
}
};
return(
<Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => handleEditRecipe(recipe)}
                disabled={currentUser && currentUser.role !== 'admin'}
              />
);
};

export const deleteRecipe = (recipe, currentUser, fetchRecipes) => {
    const handleDeleteRecipe = (recipe) => {
        Modal.confirm({
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
    return(
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
