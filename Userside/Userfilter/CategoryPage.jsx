import React, { useState, useEffect } from 'react';
import { notification } from 'antd'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { MdOutlineFavorite } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import LoadingIcons from 'react-loading-icons';
import Flexdraw from '../Userhome/Flexdraw';
import Footer from '../Userfooter/Footer';
import baseUrl from '../../../Api';
import './products.scss';




const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/product/productview`)
      .then(response => {
        const filteredProducts = response.data.filter(
          item => item.prod && item.prod[0]?.Categoryname.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [category]);

  const addToCart = (product) => {
    setLoading(true); // Set loading to true when submitting 
    const { _id, Productname, Productprice, Quantity, Description, seller } = product;
    // Prepare product details 
    const productDetails = {

      productId: _id,
      productName: Productname,
      productPrice: Productprice,
      productQuantity: Quantity,
      productDescription: Description,
      sellerId: seller,
      
    };
  
    const token = localStorage.getItem('token');
    if (!token) {
      notification.open({
        type: 'warning',
        message: 'Please Login first to add items to cart',
        placement: 'topLeft',
      });
      return;
    }
    console.log('Token:', token);
    axios
      .post(baseUrl + '/cart/cartnew', productDetails, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data' // Set content type to JSON
        },
      })
      .then(response => {
        if (response.status === 200 && response.data.message === 'Product is already in your cart') {
          notification.open({
            type: 'info',
            message: 'Product is already in your cart',
            placement: 'topLeft',
          });
        } else {
          console.log('Item added to cart:', response.data);
          navigate('/cart');
        }
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };

  const buyNow = (product) => {
    const { _id, Productname, Productprice, Quantity, Description } = product; // Function implementation for buying now
    const productDetails = {
      productId: _id,
      productName: Productname,
      productPrice: Productprice,
      productQuantity: Quantity,
      productDescription: Description
    };
    
    axios.post(baseUrl + '/ordered/neworder', productDetails)
    .then(response => {
      console.log('Ordering:', response.data);
      navigate('/order');
    })
    .catch(error => {
      console.error('Error in Ordering', error);
    });
  };

  return (
    <div>
      <Flexdraw />
      {loading ? (
        <div className="loading-animation">
          <LoadingIcons.BallTriangle stroke="green" />
        </div>
      ) : (
        <div>
          <h1 className="headcate">{category}</h1>
          <div className="bodyproduct">
            <div className="grid">
              {products.map((value, index) => (
                <div className="cardproduct" key={index}>
                  <div className="image-container">
                    {value.Photo && <img src={`data:image/jpeg;base64,${value.Photo.data}`} alt="Product" />}
                  </div>
                  <div className="content">
                    <h2 className="profile-name">{value.Productname} <span className='dashline'>  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </span>
                      <span className='price'>Price: {value.Productprice}</span> </h2>
                    {/* <p className="price">Price: {value.Productprice}</p> */}
                    <p className="quantity">
                      Quantity: {value.Quantity}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Category: {value.prod[0]?.Categoryname}
                    </p>
                    <p className='description'>
                      Description :  {value.Description}
                    </p>
                  </div>
                  <div className="cart">
                    <a className="favour">
                      <MdOutlineFavorite />
                    </a>
                    <a className="tocart" onClick={() => addToCart(value)}>
                      <FaCartPlus />
                    </a>
                    <a className="buynow" onClick={() => buyNow(value)}>
                      <AiOutlineShoppingCart />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;