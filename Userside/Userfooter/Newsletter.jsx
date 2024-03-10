import React, { useEffect, useState } from 'react';
import './newsletter.scss';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import baseUrl from '../../../Api';

const Newsletter = ({ method, data }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (method === 'put' && data) {
      setEmail(data.Email);
    }
  }, [method, data]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (method === 'post') {
      axios.post(baseUrl+"/email/emailnew", { Email: email })
        .then((response) => {
          console.log("Response:", response.data);
          alert('Record Saved');
        })
        .catch((err) => console.log(err))
    }
  };

  return (
    <div className='newsLetterBanner'>
      <SendOutlinedIcon />
      <TextField 
        type='email'
        placeholder='Your email address'
        value={email}
        onChange={handleInputChange}
      />
      <Button className='bg-g' onClick={handleSubmit}>Subscribe</Button>
    </div>
  );
}

export default Newsletter;
