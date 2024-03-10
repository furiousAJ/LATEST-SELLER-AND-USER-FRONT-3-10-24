import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, Box, CircularProgress } from '@mui/material';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../../Api';
import Sellernavbar from '../Sellerhome/Sellernavbar';
import { Buffer } from 'buffer';

const Productedit = (props) => {
  const [inputs, setInputs] = useState(props.data);
  const [category, setCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to the login page if token is not present
      navigate('/sellerlogin');
    }
  }, [navigate]);

  useEffect(() => {
    setInputs(props.data); // Update inputs state when props.data changes
  }, [props.data]);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  
    // Update image preview
    const reader = new FileReader();
    reader.onload = () => {
      setInputs((prevInputs) => ({ ...prevInputs, Photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  

  const savedata = async () => {

    window.location.reload(false);
    
    setLoading(true); // Set loading to true on form submission
  
    const formdata = new FormData();
    formdata.append('Productname', inputs.Productname);
    formdata.append('Productprice', inputs.Productprice);
    formdata.append('Quantity', inputs.Quantity);
    formdata.append('Cid', inputs.Cid);
    formdata.append('Status', inputs.Status);
    formdata.append('Description', inputs.Description);
    
    if (selectedImage) {
      // Append the new image only if it's selected
      formdata.append('Photo', selectedImage);
    }
  

    const token = localStorage.getItem('token');

    try {
      await axios.put(baseUrl + `/product/editproduct/${inputs._id}`, formdata, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      // If successful, fetch updated data from the server
      const response = await axios.get(baseUrl + `/product/getproduct/${inputs._id}`, {
        headers: {
          Authorization: token,
        },
      });

      // Update inputs state with the updated data
      setInputs(response.data);
      
      // Notify the user
      notification.success({ message: 'Record saved' });

      // Redirect to product list page
      navigate('/productlist');
    } catch (error) {
      console.log('Error:', error);
      notification.success({ message: 'Product Updated' });
    } finally {
      setLoading(false); // Reset loading state after submission completes
    }
  };

  useEffect(() => {
    axios
      .get(baseUrl + '/category/categoryview')
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Edit</h1>
        </div>
        <div className="bottom">
          <div className="left">
          <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : `data:image/jpeg;base64,${Buffer.from(inputs.Photo.data).toString('base64')}`}
              alt="Product"
              className="imgupload"
            />
          </div>
          <div className="right">
            <div className="alignform">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1.6, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="filephoto">
                  &nbsp;&nbsp;&nbsp;Product Name:
                  <br />
                  <TextField
                    placeholder="eg:Apple"
                    type="text"
                    name="Productname"
                    value={inputs.Productname}
                    onChange={inputHandler}
                  />
                  <br />
                  <br /> &nbsp;&nbsp;&nbsp;Category:
                  <br /> &nbsp;&nbsp;&nbsp;
                  <select className="boxcategory" name="Cid" value={inputs.Cid} onChange={inputHandler}>
                    {category.map((value, index) => {
                      return (
                        <option key={index} value={value._id}>
                          {value.Categoryname}
                        </option>
                      );
                    })}
                  </select>
                  <br />
                  <br></br> &nbsp;&nbsp;&nbsp;Price:
                  <br />
                  <TextField
                    id="Price"
                    placeholder="In Kg"
                    type="number"
                    name="Productprice"
                    value={inputs.Productprice}
                    onChange={inputHandler}
                  />
                  <br></br> &nbsp;&nbsp;&nbsp;Quantity:
                  <br />
                  <TextField
                    id="Quantity"
                    placeholder="Quantity Kg / Lr"
                    type="number"
                    name="Quantity"
                    value={inputs.Quantity}
                    onChange={inputHandler}
                  />
                  <br></br> &nbsp;&nbsp;&nbsp;Description:
                  <br /> &nbsp;&nbsp;&nbsp;
                  <textarea
                    id="Description"
                    label="Three ore four word"
                    type="text"
                    name="Description"
                    rows="3"
                    value={inputs.Description}
                    onChange={inputHandler}
                  />
                  <br></br> &nbsp;&nbsp;&nbsp;
                  <label htmlFor="file">Image: </label>
                  <br /> &nbsp;&nbsp;&nbsp;
                  <input type="file" className="icon" onChange={handleImage} />
                  <br />
                  <br /> &nbsp;&nbsp;&nbsp;Status:<br /> &nbsp;&nbsp;&nbsp;
                  <select className="boxact" name="Status" value={inputs.Status} onChange={inputHandler}>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                  </select>
                  <br />
                  <br />
                  <div className="button">
                    {loading ? (
                      <CircularProgress /> // Show loading indicator while submitting
                    ) : (
                      <>
                        <Button type="submit" variant="contained" color="success" onClick={savedata}>
                          Submit
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productedit;
