import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { firestore } from '../../firebase';
import FooterBar from '../common/layout/FooterBar';
import TopBar from '../common/layout/TopBar';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = firestore.collection('recipes').doc(id);
        const snapshot = await recipeRef.get();

        if (snapshot.exists) {
          const recipeData = { id: snapshot.id, ...snapshot.data() };
          setRecipe(recipeData);
        } else {
          console.log('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    
    <div>
      <TopBar />
      <h1>Recipe Details</h1>
      
      <img src={recipe.image} alt={recipe.title} style={{ width: '300px', height: '200px' }} />
      <h2>Title: {recipe.title}</h2>
      <p>Cooking Time: {recipe.cookingTime}</p>
      <p>Description: {recipe.description}</p>
      <p>
        Rating: 
        <Rating name="recipe-rating" value={recipe.rating} precision={0.05} readOnly />
      </p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <br/>
      <FooterBar/>
    </div>
  );
};

export default RecipeDetailPage;
