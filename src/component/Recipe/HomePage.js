import React, { useState, useEffect } from 'react';
import { Card, Row,Col,  Modal, Form, Button, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import Rating from '@mui/material/Rating';
import  { firestore, storage, auth } from '../../firebase';
import SearchBar from './SearchBar';
import WishlistButton from './WishlistButton';
import RecipeModal from './RecipeModal';
import DropDownContent from './DropDownContent';
import DeleteButton from './DeleteButton';


const { confirm } = Modal;

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSubMenuOption, setSelectedSubMenuOption] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

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

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
    console.log('Recipe clicked:', id);
  };

  
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleAddRecipe = () => {
   
    setEditMode(false);
    setSelectedRecipe(null);
    setModalVisible(true);
   
  };

  const handleEditRecipe = (recipe) => {
   
    setEditMode(true);
    setSelectedRecipe(recipe);
    setModalVisible(true);
    
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setImageFile(null); // Reset the selected image file
  };

  const handleModalSubmit = async (values) => {
    try {
      const recipeData = { ...values };

      if (imageFile) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(imageFile.name);

        await imageRef.put(imageFile);
        const imageURL = await imageRef.getDownloadURL();

        recipeData.image = imageURL;
      }

      // Convert ingredients from string to array
      if (typeof recipeData.ingredients === 'string') {
        recipeData.ingredients = recipeData.ingredients.split(',').map((ingredient) => ingredient.trim());
      }

      if (editMode) {
        firestore
          .collection('recipes')
          .doc(selectedRecipe.id)
          .update(recipeData)
          .then(() => {
            fetchRecipes();
          })
          .catch((error) => {
            console.error('Error updating recipe:', error);
          });
      } else {
        firestore
          .collection('recipes')
          .add(recipeData)
          .then(() => {
            fetchRecipes();
          })
          .catch((error) => {
            console.error('Error adding recipe:', error);
          });
      }

      setModalVisible(false);
      form.resetFields();
      setImageFile(null); // Reset the selected image file
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  const handleImageUpload = (file) => {
    setImageFile(file);
    return false; // Prevent the default upload behavior
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedSubMenuOption(null);
  };

  const handleSubMenuOptionClick = (option) => {
    setSelectedSubMenuOption(option);
  };

  const handleSort = (sortType) => {
    let sortedRecipes = [...recipes];

    switch (sortType) {
      case 'high':
        sortedRecipes.sort((a, b) => b.calories - a.calories);
        break;
      case 'low':
        sortedRecipes.sort((a, b) => a.calories - b.calories);
        break;
      default:
        break;
    }

    setRecipes(sortedRecipes);
  };
   const handleRatingSort = (sortType) => {
    // Implement sorting based on rating here
    // For example:
    let sortedRecipes = [];
    if (sortType === 'high') {
      sortedRecipes = [...recipes].sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'low') {
      sortedRecipes = [...recipes].sort((a, b) => a.rating - b.rating);
    }
    setRecipes(sortedRecipes);
  };

  const renderContent = () => {
    let filteredRecipes = [...recipes];

    if (searchValue) {
     filteredRecipes = filteredRecipes.filter((recipe) => {
    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.map((ingredient) => ingredient.toLowerCase())
      : [];
    return ingredients.some((ingredient) => ingredient.includes(searchValue.toLowerCase()));
  });
  }

    if (selectedOption === 'cusine') {
      switch (selectedSubMenuOption) {
        case 'indian':
          filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Indian');
          break;
        case 'continental':
          filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Continental');
          break;
        case 'chinese':
          filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Chinese');
          break;
        case 'italian':
          filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Italian');
          break;
        default:
          break;
      }
    } else if (selectedOption === 'dairy') {
      switch (selectedSubMenuOption) {
        case 'dairy':
          filteredRecipes = filteredRecipes.filter((recipe) => recipe.isDairy === true);
          break;
        case 'non-dairy':
          filteredRecipes = filteredRecipes.filter((recipe) => recipe.isDairy === false);
          break;
        default:
          break;
      }
    }

    return (
      <div>
        <div>
          <Row gutter={[16, 16]}>
            <Col span={8}>
            <SearchBar searchValue={searchValue} onSearchChange={handleSearchChange} />
            </Col>
            <Col span={8}>
              <Button type="primary" icon={<PlusOutlined />} disabled={currentUser && currentUser.role !== 'admin'} onClick={handleAddRecipe}>
              
                Add Recipe
              </Button>
            </Col>
          </Row>
        </div>
        <br />
        <Row gutter={[16, 16]}>
          {filteredRecipes.map((recipe) => (
            <Col key={recipe.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={recipe.title} onClick={() => handleRecipeClick(recipe.id)} src={recipe.image} />}
                
              >
                <Card.Meta title={recipe.title} description={`Cooking Time: ${recipe.cookingTime}`} />
                <br />
                <Rating name="recipe-rating" value={Number(recipe.rating)} precision={0.1} readOnly />
                <br />
                <div style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => handleEditRecipe(recipe)}
                    disabled={currentUser && currentUser.role !== 'admin'}
                  />
                  <DeleteButton recipe={recipe} /*onclick={(fetchRecipes())}*/ />
                  <WishlistButton recipe={recipe}  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      
    <RecipeModal
        modalVisible={modalVisible}
        editMode={editMode}
        selectedRecipe={selectedRecipe}
        handleModalCancel={handleModalCancel}
        handleModalSubmit={handleModalSubmit}
        handleImageUpload={handleImageUpload}
        form={form}
        imageFile={imageFile}
      />
    
    </div>
  );
};
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: '0.99' }}></div>
  <div>
      <DropDownContent
        selectedOption={selectedOption}
        selectedSubMenuOption={selectedSubMenuOption}
        handleOptionClick={handleOptionClick}
        handleSubMenuOptionClick={handleSubMenuOptionClick}
        handleSort={handleSort}
        handleRatingSort={handleRatingSort}
      />

      {renderContent()}
    </div>
    </div>
    </div>
  );
};

export default HomePage;
