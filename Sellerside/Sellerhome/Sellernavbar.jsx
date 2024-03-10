

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ecog from '../../../imgs/ecog.png';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import baseUrl from '../../../Api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PreviewIcon from '@mui/icons-material/Preview';



const Sellernavbar = ({ sellerId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { id: profileId } = useParams(); // Use 'id' instead of 'Id'


console.log('id', sellerId);
  const handleSearch = () => {
    console.log("Search query: ", searchQuery);
    // Implement your search functionality here
  };
  

  const navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem("token");
      // Navigate to the login page
      navigate("/sellerlogin");
    };

    
 

  return (
    <div>
    <nav className="hnavbar">
      <div className="hlogo">
        <a href="#"><img src={ecog} className='hpi' alt="Your SVG" /></a>
      </div>
      <div className="hmenu">
        <div className="hmenu-links">
          <div className="husernavContainer">
            <div className="husersearchContainer">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search..." 
                className="husersearchInput" />
              <button 
                onClick={handleSearch} 
                className="husersearchButton" >
                <SearchIcon/>
              </button>
            </div>
          </div>
          {/* <Link to="/seller" style={{ textDecoration: "none" }}>
            <p className='hhicon'><DashboardIcon  />Dashboard</p></Link> */}

<Link to={`/profile/${sellerId}`} style={{ textDecoration: "none" }}>
  <p className='hhicon'><AccountCircleOutlinedIcon  />Profile</p>
</Link>



          <Link to="/products" style={{ textDecoration: "none" }}>
            <p className='hhicon'><AddBusinessIcon  />Add Product</p>
          </Link>
          <Link to="/productlist">
            <p className='hhicon'><StorefrontIcon  /> View Product</p>
          </Link>
          <Link to="/sellerorder">
            <p className='hhicon'><LocalShippingIcon />Orders</p>
          </Link>
        </div> 
        <Link  to="/sellerlogin" style={{ textDecoration: "none" }}>
          <button onClick={handleLogout} className="hreg-in">Log out</button>
        </Link>
      </div>
      <div className="hmenu-btn">
        <MenuIcon />
      </div>
    </nav>
  </div>
  )
}

export default Sellernavbar
