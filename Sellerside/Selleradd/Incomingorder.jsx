// IncomingOrder.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import baseUrl from '../../../Api';
import moment from 'moment'; 
import Sellernavbar from '../Sellerhome/Sellernavbar';
import './product.scss'

const Incomingorder = () => {
  const { productId } = useParams(); 
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    fetchOrders(); // Fetch orders once on component mount
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(baseUrl + '/sellerview/sellervieworder');
      setOrders(response.data.map(order => ({
        ...order,
        orderDate: moment(order.orderDate).format('YYYY-MM-DD') 
      })));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      await axios.put(baseUrl + `/sellerview/acceptorder/${orderId}`);
      fetchOrders(); // Refetch orders after accepting
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const markAsShipped = async (orderId) => {
    try {
      await axios.put(baseUrl + `/sellerview/markasshipped/${orderId}`);
      fetchOrders(); // Refetch orders after marking as shipped
    } catch (error) {
      console.error('Error marking order as shipped:', error);
    }
  };

  const markAsDelivered = async (orderId) => {
    try {
      await axios.put(baseUrl + `/sellerview/markasdelivered/${orderId}`);
      fetchOrders(); // Refetch orders after marking as delivered
    } catch (error) {
      console.error('Error marking order as delivered:', error);
    }
  };

  return (
    <div className="midall">
      <Sellernavbar/>
      <br />
      <h2 className="hd">Orders</h2>
      {orders.length === 0 ? (
        <p className='nocart'>No items in the orders...!</p>
      ) : (
        <div className="cart-box">
          <table>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.productPrice}</td>
                  <td>{item.productQuantity}</td>
                  <td>{item.productDescription}</td>
                  <td>{item.status}</td>
                  <td>{item.orderDate}</td> 
                  <td>
                    {item.status !== 'Accepted' && (
                      <button onClick={() => acceptOrder(item._id)} className='buttonseller1' >Accept</button>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {item.status === 'Accepted' && (
                      <button onClick={() => markAsShipped(item._id)}  className='buttonseller2' >Shipped</button>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {item.status === 'Shipped' && (
                      <button onClick={() => markAsDelivered(item._id)}  className='buttonseller3' >Delivered</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Incomingorder;
