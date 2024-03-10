import React, { useEffect, useState } from 'react'
import baseUrl from '../../../Api';
import axios from 'axios';
import moment from 'moment';
import Flexdraw from './Flexdraw';
import Footer from '../Userfooter/Footer';
import { Link } from 'react-router-dom';

const Orderview = () => {
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

  return (
    <div className="midall">
      <Flexdraw />
      <br />
      <h2 className="hd">My Orders</h2>
      {orders.length === 0 ? (
        <p className='nocart'>No items in the orders...!</p>
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
                <th>Date</th>
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
                  <td>{item.productQuantity}</td>
                  <td>{item.productDescription}</td>
                  <td>{item.status}</td>
                  <td>{item.orderDate}</td> 
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="homefooterbottom"></div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Orderview
