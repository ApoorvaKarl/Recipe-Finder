# Recipe-finder
 The Recipe Finder Application is a web-based application developed using React.js with the Ant Design (Antd) framework that allows users to search for and discover a wide variety of recipes. It provides a convenient way to explore new dishes, find inspiration for meal planning, and satisfy culinary curiosity. Recipe Finder Application. It allows users to search for and discover various recipes, manage a wishlist, and perform various actions based on user roles.

KEY FEATURES

USER_AUTHENTICATION: The application provides user registration and login functionality using Firebase Authentication. Users can create an account with their email and password to access the features of the application. USER_ROLES: The application differentiates between two user roles: "admin" and "user." The admin role has additional privileges such as editing , deleting and add new recipes, while the user role can only wishlist recipes. RECIPE_SEARCH_AND_FILTERING: Users can search for recipes by ingredients or title using the search bar on the homepage. The application also provides sorting and filtering options based on cuisine (Indian, Italian, Chinese, Continental), dairy (true/false), calorie count (ascending/descending), and rating (high/low). RECIPE_DETAILS: Each recipe is displayed as a card on the homepage, showing the recipe image, title, description, and rating. Clicking on a recipe card navigates the user to a recipe details page, where they can view the complete information about the recipe, including ingredients, procedure, cuisine, calorie count, dairy status, cooking time, and rating. WISHLIST_RECIPES: Users can wishlist their favorite recipes, which are stored in the backend using Firebase Firestore. Only users with the "user" role can wishlist recipes. ADD_NEW_RECIPES: Users with the "admin" role can add new recipes by providing all the necessary details, such as title, image, ingredients, procedure, cuisine, calorie count, and cooking time. The recipe details are stored in Firebase Firestore, and the recipe image is stored using Firebase Storage. RSEPONSIVE_DESIGN: The application is designed to be responsive and can adapt to different screen sizes, providing an optimal user experience on both desktop and mobile devices.

TECHNOLOGIES USED

Front-end: React.js, Ant Design (Antd) framework Back-end (Authentication and Database): Firebase (Firebase Authentication, Firestore) Backend (Image Storage): Firebase Storage

DEPLOYMENT

The Recipe Finder Application can be deployed using any suitable hosting platform. One recommended option is Netlify, which provides easy deployment for React.js applications. The deployment process can be configured to automatically build and deploy the application whenever changes are pushed to the main branch.
