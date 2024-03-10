import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './usersignup.scss'
// import backgroundSeller from './images/seller.jpg';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust this URL based on your server configuration
});


const Usersignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/uauth/usersignup', formData);
      console.log('Signup successful', response.data);
      // Handle success, e.g., show success message, reset form, redirect to login page
      setSuccessMessage('Signup successful. You can now log in.');
      setErrorMessage('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
      });
    } catch (error) {
      console.error('Signup failed', error.response ? error.response.data : error.message);
      // Handle error, e.g., show error message
      setErrorMessage(error.response ? error.response.data.message : 'Signup failed. Please try again.');
      setSuccessMessage('');
    }
  };


  return (
    <div className='usersignupppostion'>
      
    <div className="usersignuppcontainer">
      <div className="usersignuppimage-section">
        <div className="usersignuppimage-wrapper">
          <img src={require('../Userimg/fru.jpg')} alt="" />
        </div>
        <div className="usersignuppcontent-container">
          <h1 className="usersignuppsection-heading">IT'S ALWAYS BETTER WHEN IT'S <span>Natural..</span></h1>
          <p className="usersignuppsection-paragraph">Eat well Feel goog.</p>
        </div>
      </div>
      <div className="usersignuppform-section">
        <div className="usersignuppform-wrapper">
          {/* <div className="usersignupplogo-container">
           
              <img src={require('../image/ecog.png')} alt="Logo" />
            
          </div> */}
          <h2>Hey User 👋🏻</h2>
          <p>Enter your credentials to access your account.</p>
          <div className="usersignuppinput-container">
            <div className="usersignuppform-group">
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
              <label htmlFor="name">Name</label>
              <input type="text" name='name' id="name" autoComplete="off" value={formData.name} onChange={handleChange} />
            </div>
             <div className="usersignuppform-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" autoComplete="off"  name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="usersignuppform-group">
              <label htmlFor="password">Password</label>
              <input type="password"  id="password"  name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="usersignuppform-group">
              <label htmlFor="phoneno">Phone No</label>
              <input type="tel" name='phone' id="phone" autoComplete="off" value={formData.phone} onChange={handleChange} />
            </div>
             <div className="usersignuppform-group">
              <label htmlFor="address" >Address</label>
              <textarea  id="address" name='address' rows={3} autoComplete="off" value={formData.address} onChange={handleChange} />
            </div>

          </div>
         
          <button className="usersignupplogin-btn"  onClick={handleSignup}>Sign Up</button>
          <div className="useror-dividers">or</div>
        
          <Link to="/" style={{textDecoration:"none"}}> 
          {/* <h4 className='sellerform'> Log in </h4> */}
          <button className="usersignuplog-btn">Log in</button>
          </Link>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Usersignup


