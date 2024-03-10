import React, { useEffect } from 'react'
import './home.scss'

import Sellernavbar from './Sellernavbar'
import Featured from './Featured'
import Chart from './Chart'
import Widget from './Widget'
import { useNavigate } from 'react-router-dom'



const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the presence of the token in localStorage or wherever you store it
    const token = localStorage.getItem('token');
    console.log('token',token);
    if (!token) {
      // Token is not present, navigate to the login page
      navigate('/sellerlogin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once when the component mounts
  return (
    <div className='home'>
      
      <div className="homeContainer">
        <Sellernavbar/> 
        <div className="widgets">
        <Widget type="user"/>
        <Widget type="order"/>
        <Widget type="earning"/>
        <Widget type="balance"/>
        </div>
        <div className="charts">
        <Featured/>
        <Chart title="Last Transactions" aspect={2/1}/>
        </div>
        
      </div>
    </div>
  )
}

export default Home