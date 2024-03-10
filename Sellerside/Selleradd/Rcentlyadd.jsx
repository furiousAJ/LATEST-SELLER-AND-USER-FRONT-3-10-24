import React, { useEffect } from 'react'
import './recentlyadd.scss'
import Productview from './Productview'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './recentlyadd.scss'
import Sellernavbar from '../Sellerhome/Sellernavbar'
const Recentlyadd = () => {
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
   <div className='addprodnew'>
    
      <div className="addprodnewContainer">
        <Sellernavbar/>
        <div className="addprodtop"> <Link to="/add" style={{textDecoration:"none"}} className='addprodlink'>
           <Button className='buttadd'>Add products</Button></Link>
        </div>
        <div className="addprodbottom"><h2 className='rece'>Recently Added</h2><br></br>
          <Productview/>
          
      </div>
    </div></div>
  )
}

export default Recentlyadd