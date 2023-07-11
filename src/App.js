import {React} from 'react';
import Login from './Login';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './component/Recipe/HomePage';
import LandingPage from './pages/private/LandingPage';
import RecipeDetailPage from './component/Recipe/RecipeDetailPage';
import Registration from './Registration';
import Wishlist from './component/Recipe/WishlistPage';


const App = () => {

  return (
    <Router>
      <Routes>       
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Home" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path = "/Registration" element ={<Registration/>} />
        <Route path = "/wishlist" element ={<Wishlist/>} />
      </Routes>
    </Router>
    
  );
};

export default App;
