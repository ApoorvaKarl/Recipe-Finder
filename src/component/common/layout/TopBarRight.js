// import { Layout, Row } from 'antd';
// import TopBarStyle from '../../../styles/layout/TopBarStyle';
// import useToggle from './useToggle';
// import "./style.css";
// import React from "react";
// import {Link} from "react-router-dom";
// import LogoImage from '../../../assets/logo.png';

// const { Header } = Layout;
// const Constants = {
//   APP_NAME: 'Flavour Mate',
// }


// const TopBar = () => {
//   const [toggle, setToggle] = useToggle(false);

//   const handleNavbar = () => {
//       setToggle(!toggle);
//   };

//   const handleNavbarClose = () => {
//       setToggle(false);
//   };
//   return (
//     <Layout hasSider={false}>
//   <TopBarStyle>
//     <Header className="topBar">

//     <img alt="#" src={LogoImage} height={64} title={Constants.APP_NAME} />
// <button className="navbar-button" onClick={handleNavbar}>
//         <span className="navbar-button-emoji" aria-label="menu-button" role="img">&#129409;</span>
// </button>

// <nav className="navbar-container-mobile" style={{display: toggle && "flex"}} onClick={handleNavbarClose}>
//     <ul className="navbar-list-mobile" id="slide">
//         <li>
//             <Link to="/">Login</Link>
//         </li>
//             <li><Link to="/profile">Profile</Link></li>
//             <li><Link to="/LandingPage">HomePage</Link></li>
//     </ul>
// </nav>
//     </Header>
//   </TopBarStyle>
//   </Layout>
// );
//   };

// export default TopBar;
