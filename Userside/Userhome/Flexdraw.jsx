import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ecog from '../../../imgs/ecog.png';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import './flexdraw.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import baseUrl from '../../../Api';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Flexdraw = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); // Initialize cart count

  useEffect(() => {
    axios.get(baseUrl + '/category/categoryview')
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    console.log("Search query: ", searchQuery);
    navigate(`/search/${searchQuery}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    navigate(`/category/${category}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
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
            <Link to="/userside" style={{ textDecoration: "none" }}><p className='hhicon'><HomeIcon  />Home</p></Link>
            <div className="hdropdown">
              <button className="hdropdown-button" onClick={() => setIsOpen(!isOpen)}>
                <span style={{fontSize:'17px'}}><p className='hhicon'> <CategoryIcon  /> Categories<KeyboardArrowDownIcon/></p> </span>
              </button>
              {isOpen && (
                <div className="hdropdown-menu">
                  {category.map((value) => (
                    <button
                      key={value._id}
                      className="hdropbox"
                      onClick={() => handleCategoryChange(value.Categoryname)}
                    >
                      {value.Categoryname}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link  to="/cart" style={{ textDecoration: "none" }}>
              <p className='hhicon'><ShoppingCartOutlinedIcon  /> Cart</p>
            </Link>
            <Link to="/order"> 
              <p className='hhicon'><LocalShippingIcon />Orders</p>
            </Link>
            <Link to="/sellerlogin"> 
              <p className='hhicon'><StorefrontIcon  /> Seller</p>
            </Link>
            <Link to="/about"> 
              <p className='hhicon'><ContactSupportIcon />About Us</p>
            </Link>
          </div> 
          <Link  to="/" style={{ textDecoration: "none" }}>
            <button onClick={handleLogout} className="hreg-in">Log out</button>
          </Link>
        </div>
        <div className="hmenu-btn">
          <MenuIcon />
        </div>
      </nav>
    </div>
  );
}

export default Flexdraw;
