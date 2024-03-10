import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../../Api';
import Footer from '../Userfooter/Footer';
import { Link } from 'react-router-dom';
import Flexdraw from './Flexdraw';

const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(baseUrl + '/ordered/vieworder');
      const lastOrder = response.data[response.data.length - 1];
      setSelectedOrder(lastOrder);
      calculateTotalAmount(lastOrder);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateTotalAmount = (order) => {
    const total = order.productPrice * order.productQuantity;
    setTotalAmount(total);
  };

  const sendToSellerProfile = async (item) => {
    try {
      await axios.post(baseUrl + '/sellerview/orderseller', item); // Sending the order details in the request body
      console.log('Sending order to seller:', item);
      alert('Ordering....');
      // Assuming you want to navigate to another page after sending to seller
    } catch (error) {
      console.error('Error sending order to seller:', error);
    }
  };

  const handleIncrement = () => {
    const updatedOrder = { ...selectedOrder };
    updatedOrder.productQuantity++;
    setSelectedOrder(updatedOrder);
    calculateTotalAmount(updatedOrder);
  };

  const handleDecrement = () => {
    const updatedOrder = { ...selectedOrder };
    if (updatedOrder.productQuantity > 1) {
      updatedOrder.productQuantity--;
      setSelectedOrder(updatedOrder);
      calculateTotalAmount(updatedOrder);
    }
  };

  return (
    <div className="midall">
      <Flexdraw />
      <br />
      <h2 className="hd">Orders</h2>
      {selectedOrder ? (
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
              <tr>
                <td>
                  <Link to={`/products/${selectedOrder.productId}`}>
                    {selectedOrder.productName}
                  </Link>
                </td>
                <td>{selectedOrder.productPrice}</td>
                <td>
                  <div className="quantity-control">
                    <button onClick={handleDecrement}>-</button>
                    <span>{selectedOrder.productQuantity}</span>
                    <button onClick={handleIncrement}>+</button>
                  </div>
                </td>
                <td>{selectedOrder.productDescription}</td>
                
                <td>{selectedOrder.status}</td>
                <td>
                  <button className="send-to-seller-button" onClick={() => sendToSellerProfile(selectedOrder)}>
                    Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="total-amount">Total Amount  : ₹
            {totalAmount}</div>
        </div>
      ) : (
        <p className='nocart'>No items in the orders...!</p>
      )}
      <div className="homefooterbottom"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Order;
