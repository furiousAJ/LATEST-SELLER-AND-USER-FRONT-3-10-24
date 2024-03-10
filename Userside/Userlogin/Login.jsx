import React, { useState } from 'react';
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login= ({setAuth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/uauth/userlogin', {
        email,
        password,
      });
  
      console.log('Login successful', response.data);
      // Handle successful login (e.g., store token in state or localStorage)
      localStorage.setItem("token", response.data.token);
      setAuth(true);
  
      navigate('/userside')
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error.message);
      // Check if error.response is defined before accessing its properties
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage(error.response ? error.response.data.message : 'Login failed. Please try again.');
      }
    }
  };


  return (
    <div className='userpostion'>
      
    <div className="usercontainer">
      <div className="userimage-section">
        <div className="userimage-wrapper">
          <img src={require('../Userimg/ve.jpg')} alt="" />
        </div>
        <div className="usercontent-container">
          <h1 className="usersection-heading">IT'S ALWAYS BETTER WHEN IT'S <span>Natural..</span></h1>
          <p className="usersection-paragraph">Eat well Feel goog.</p>
        </div>
      </div>
      <div className="userform-section">
        <div className="userform-wrapper">
          <div className="userlogo-container">
            <a href="#" className="userlogo-container">
              <img src={require('../../../imgs/ecog.png')} alt="Logo" />
            </a>
          </div>
          <h2>Welcome Back! 👋🏻</h2>
          <p>Enter your credentials to access your account.</p>
          
          <div className="userinput-container">
            <div className="userform-group">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
              <label htmlFor="email">Email</label>
              <input type="email" id="email" autoComplete="off"  
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />

            </div>
            <div className="userform-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password"   
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="userremember-forgot">
            <div className="userremember-me">
              <input type="checkbox" defaultValue="remember-me" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>
          <button className="userlogin-btn" onClick={handleLogin}>Log In</button>
          <div className="useror-divider">or</div>
          <div className='usersign'><Link to="/signup" style={{textDecoration:"none"}}>
          <button className="usergoogle-signin">
          
            <span>Sign Up</span>
          </button></Link></div>
        </div>
      </div>
     
    </div>
  </div>
    
  );
};


export default Login;