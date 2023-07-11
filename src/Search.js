// import React, { useState, useEffect } from 'react';
// import { Card, Row,  Dropdown, Menu,Col, Input, Modal, Form, Button, Upload } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
// import Rating from '@mui/material/Rating';
// import  { firestore, storage, auth } from '../../firebase';
// import SearchBar from './SearchBar';
// import WishlistButton from './WishlistButton';
// import RecipeModal from './RecipeModal';
// import DeleteButton from './DeleteButton';


// const { confirm } = Modal;

// const HomePage = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedSubMenuOption, setSelectedSubMenuOption] = useState(null);
//   const [searchValue, setSearchValue] = useState('');
//   const [recipes, setRecipes] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [editMode, setEditMode] = useState(false);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('Fetching recipes...');
//     fetchRecipes();
  
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
  
//       if (user) {
//         firestore
//           .collection('users')
//           .doc(user.uid)
//           .get()
//           .then((doc) => {
//             if (doc.exists) {
//               const userData = doc.data();
//               setCurrentUser({ ...user, role: userData.role });
//             }
//           })
//           .catch((error) => {
//             console.error('Error fetching user data:', error);
//           });
//       }
//     });
  
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const fetchRecipes = async () => {
//     try {
//       const recipesRef = firestore.collection('recipes');
//       const snapshot = await recipesRef.get();
//       console.log('Snapshot:', snapshot);

//       const recipesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log('Recipes Data:', recipesData);

//       setRecipes(recipesData);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   const handleRecipeClick = (id) => {
//     navigate(`/recipe/${id}`);
//     console.log('Recipe clicked:', id);
//   };

  
//   const handleSearchChange = (value) => {
//     setSearchValue(value);
//   };

//   const handleAddRecipe = () => {
   
//     setEditMode(false);
//     setSelectedRecipe(null);
//     setModalVisible(true);
   
//   };

//   const handleEditRecipe = (recipe) => {
   
//     setEditMode(true);
//     setSelectedRecipe(recipe);
//     setModalVisible(true);
    
//   };

//   const handleModalCancel = () => {
//     setModalVisible(false);
//     form.resetFields();
//     setImageFile(null); // Reset the selected image file
//   };

//   const handleModalSubmit = async (values) => {
//     try {
//       const recipeData = { ...values };

//       if (imageFile) {
//         const storageRef = storage.ref();
//         const imageRef = storageRef.child(imageFile.name);

//         await imageRef.put(imageFile);
//         const imageURL = await imageRef.getDownloadURL();

//         recipeData.image = imageURL;
//       }

//       // Convert ingredients from string to array
//       if (typeof recipeData.ingredients === 'string') {
//         recipeData.ingredients = recipeData.ingredients.split(',').map((ingredient) => ingredient.trim());
//       }

//       if (editMode) {
//         firestore
//           .collection('recipes')
//           .doc(selectedRecipe.id)
//           .update(recipeData)
//           .then(() => {
//             fetchRecipes();
//           })
//           .catch((error) => {
//             console.error('Error updating recipe:', error);
//           });
//       } else {
//         firestore
//           .collection('recipes')
//           .add(recipeData)
//           .then(() => {
//             fetchRecipes();
//           })
//           .catch((error) => {
//             console.error('Error adding recipe:', error);
//           });
//       }

//       setModalVisible(false);
//       form.resetFields();
//       setImageFile(null); // Reset the selected image file
//     } catch (error) {
//       console.error('Error submitting recipe:', error);
//     }
//   };

//   const handleImageUpload = (file) => {
//     setImageFile(file);
//     return false; // Prevent the default upload behavior
//   };
  
//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setSelectedSubMenuOption(null);
//   };

//   const handleSubMenuOptionClick = (option) => {
//     setSelectedSubMenuOption(option);
//   };

//    const handleRatingSort = (sortType) => {
//     // Implement sorting based on rating here
//     // For example:
//     let sortedRecipes = [];
//     if (sortType === 'high') {
//       sortedRecipes = [...recipes].sort((a, b) => b.rating - a.rating);
//     } else if (sortType === 'low') {
//       sortedRecipes = [...recipes].sort((a, b) => a.rating - b.rating);
//     }
//     setRecipes(sortedRecipes);
//   };
//   const handleCalorieSort = (sortType) => {
//     // Implement sorting based on rating here
//     // For example:
//     let sortedRecipes = [];
//     if (sortType === 'high') {
//       sortedRecipes = [...recipes].sort((a, b) => b.calorie - a.calorie);
//     } else if (sortType === 'low') {
//       sortedRecipes = [...recipes].sort((a, b) => a.calorie - b.calorie);
//     }
//     setRecipes(sortedRecipes);
//   };

//   const handleCusineFilter = (filterType) => {
//     // Implement sorting based on rating here
//     // For example:
//     let filteredRecipes = [];
//     if (filterType === 'indian') {
//       filteredRecipes = [...recipes].filter((recipe) => recipe.cuisine === 'Indian');
//     } else if (filterType === 'continental') {
//       filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Continental');
//     }else if (filterType === 'chinese') {
//       filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Chinese');
//     }else if (filterType === 'italian') {
//       filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Italian');
//     }
//     setRecipes(filteredRecipes);
//   };

//   const renderContent = () => {
//     let filteredRecipes = [...recipes];
  
//     if (searchValue) {
//       filteredRecipes = filteredRecipes.filter((recipe) => {
//         const ingredients = Array.isArray(recipe.ingredients)
//           ? recipe.ingredients.map((ingredient) => ingredient.toLowerCase())
//           : [];
//         return ingredients.some((ingredient) => ingredient.includes(searchValue.toLowerCase()));
//       });
//     }
  
//     if (selectedOption === 'cuisine') {
//       switch (selectedSubMenuOption) {
//         case 'indian':
//           filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Indian');
//           break;
//         case 'continental':
//           filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Continental');
//           break;
//         case 'chinese':
//           filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Chinese');
//           break;
//         case 'italian':
//           filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === 'Italian');
//           break;
//         default:
//           break;
//       }
//     } else if (selectedOption === 'dairy') {
//       switch (selectedSubMenuOption) {
//         case 'dairy':
//           filteredRecipes = filteredRecipes.filter((recipe) => recipe.dairy === true);
//           break;
//         case 'non-dairy':
//           filteredRecipes = filteredRecipes.filter((recipe) => recipe.dairy === false);
//           break;
//         default:
//           break;
//       }
//     }

//     return (
//       <div>
//         <div>
//           <Row gutter={[16, 16]}>
//             <Col span={8}>
//             <SearchBar searchValue={searchValue} onSearchChange={handleSearchChange} />
//             </Col>
//             <Col span={8}>
//               <Button type="primary" icon={<PlusOutlined />} disabled={currentUser && currentUser.role !== 'admin'} onClick={handleAddRecipe}>
              
//                 Add Recipe
//               </Button>
//             </Col>
//           </Row>
//         </div>
//         <br />
//         <Row gutter={[16, 16]}>
//           {filteredRecipes.map((recipe) => (
//             <Col key={recipe.id} xs={24} sm={12} md={8} lg={6}>
//               <Card
//                 hoverable
//                 cover={<img alt={recipe.title} onClick={() => handleRecipeClick(recipe.id)} src={recipe.image} />}
                
//               >
//                 <Card.Meta title={recipe.title} description={`Cooking Time: ${recipe.cookingTime}`} />
//                 <br />
//                 <Rating name="recipe-rating" value={Number(recipe.rating)} precision={0.1} readOnly />
//                 <br />
//                 <div style={{ textAlign: 'right' }}>
//                   <Button
//                     type="primary"
//                     shape="circle"
//                     icon={<EditOutlined />}
//                     onClick={() => handleEditRecipe(recipe)}
//                     disabled={currentUser && currentUser.role !== 'admin'}
//                   />
//                   <DeleteButton recipe={recipe}/>
//                   <WishlistButton recipe={recipe} />
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>
      
//     <RecipeModal
//         modalVisible={modalVisible}
//         editMode={editMode}
//         selectedRecipe={selectedRecipe}
//         handleModalCancel={handleModalCancel}
//         handleModalSubmit={handleModalSubmit}
//         handleImageUpload={handleImageUpload}
//         form={form}
//         imageFile={imageFile}
//       />
    
//     </div>
//   );
// };

// return (
//   <div>
//     <div style={{ display: 'flex', alignItems: 'center' }}>
// <div style={{ flex: '0.99' }}></div>
//     <Dropdown overlay={
//       <Menu onClick={({ key }) => handleOptionClick(key)}>
//         <Menu.Item key="cusine">Cuisine</Menu.Item>
//         <Menu.Item key="dairy">Dairy</Menu.Item>
//         <Menu.Item key="calorie">Calorie</Menu.Item>
//         <Menu.Item key="rating">Rating</Menu.Item>
//       </Menu>
      
//     }icon={<PlusOutlined />}>

//       <Button type="primary" >Sort and Display</Button>
      
//     </Dropdown>
    
//     &nbsp;&nbsp;&nbsp;&nbsp;

//     {selectedOption === 'calorie' && (
//       <Dropdown overlay={
//         <Menu onClick={({ key }) => handleCalorieSort(key)}>
//           <Menu.Item key="high">High Calorie</Menu.Item>
//           <Menu.Item key="low">Low Calorie</Menu.Item>
//         </Menu>
//       }>
//         <Button>Sort by Calorie</Button>
//       </Dropdown>
//     )}
//     {selectedOption === 'rating' && (
//       <Dropdown overlay={
//         <Menu onClick={({ key }) => handleRatingSort(key)}>
//           <Menu.Item key="high">High Rating</Menu.Item>
//           <Menu.Item key="low">Low Rating</Menu.Item>
//         </Menu>
//       }>
//         <Button>Sort by Calorie</Button>
//       </Dropdown>
//     )}
//     {selectedOption === 'dairy' && (
//       <Dropdown menu={ 
//         <Menu >
//         <Menu.Item key="dairy" onClick={() => handleSubMenuOptionClick('dairy')}>Dairy</Menu.Item>
//         <Menu.Item key="non-dairy" onClick={() => handleSubMenuOptionClick('non-dairy')}>Non-Dairy</Menu.Item>
//       </Menu>
//       }>
//         <Button>Sort by Dairy</Button>
//       </Dropdown>
//     )}
//     {selectedOption === 'cusine' && (
//       <Dropdown overlay={ 
//         <Menu onClick={({ key }) => handleCusineFilter(key)} >
//         <Menu.Item key="indian" >Indian</Menu.Item>
//         <Menu.Item key="continental" >Continental</Menu.Item>
//         <Menu.Item key="chinese" >Chinese</Menu.Item>
//         <Menu.Item key="italian" >Italian</Menu.Item>
//       </Menu>
//       }>
//         <Button>Sort by Cuisine</Button>
//       </Dropdown>
//     )}
//     </div>
    

//     <Menu mode="horizontal">
//       {/* {renderSubMenu()} */}
//     </Menu>

//     {renderContent()}
//   </div>
// );
// };


// export default HomePage;
