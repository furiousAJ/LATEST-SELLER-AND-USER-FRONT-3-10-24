import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Flexdraw from './Flexdraw';
import './cart.scss';
import Footer from '../Userfooter/Footer';
import axios from 'axios';
import baseUrl from '../../../Api';

const Cart = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(baseUrl + '/cart/viewcart');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  
  const sendToSellerProfile = async () => {
    try {
      // Iterate through each item in the orders array and send them to the seller's profile
      for (const item of orders) {
        const requestData = { ...item };
        await axios.post(baseUrl + '/sellerview/orderseller', requestData);
        console.log('Sending order to seller:', requestData);
        alert('Ordering....');
      }
      // Clear the cart after sending all items
      await axios.delete(baseUrl + '/cart/clear');
      setOrders([]);
    } catch (error) {
      console.error('Error sending order to seller:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${baseUrl}/cart/remove/${id}`);
      fetchOrders(); // Fetch orders again to update the cart
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleIncrement = async (id) => {
    try {
      await axios.put(`${baseUrl}/cart/increment/${id}`);
      fetchOrders(); // Fetch orders again to update the cart
    } catch (error) {
      console.error('Error incrementing item quantity:', error);
    }
  };

  const handleDecrement = async (id) => {
    try {
      await axios.put(`${baseUrl}/cart/decrement/${id}`);
      fetchOrders(); // Fetch orders again to update the cart
    } catch (error) {
      console.error('Error decrementing item quantity:', error);
    }
  };

  // Calculate total amount
  const totalAmount = orders.reduce((total, item) => total + (item.productPrice * item.productQuantity), 0);

  return (
    <div className="midall">
      <Flexdraw />
      <br />
      <h2 className="hd">Cart</h2>
      {orders.length === 0 ? (
        <p className='nocart'>No items in the cart...!</p>
      ) : (
        <div className="cart-box">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/products/${item.productId}`}>
                      {item.productName}
                    </Link>
                  </td>
                  <td>{item.productPrice}</td>
                  <td>
                    <div className="quantity-control">
                      <button onClick={() => handleDecrement(item._id)}>-</button>
                      <span>{item.productQuantity}</span>
                      <button onClick={() => handleIncrement(item._id)}>+</button>
                    </div>
                  </td>
                  <td>{item.productDescription}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className='removebutton' onClick={() => removeFromCart(item._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="total-amount">
        Total Amount:  ₹{totalAmount}
      </div>
      <button className="proceed-button" onClick={sendToSellerProfile}>
        Proceed to Order
      </button>
      <div className="homefooterbottom"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
