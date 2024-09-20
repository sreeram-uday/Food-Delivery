import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useContext } from "react";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [count,setCount] = useState(0)
  // Function to fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const data = {
      status: event.target.value,
      orderId: orderId
    }
    try{
      const response = await axios.post(url+"/api/order/status",data)
      if(response.data.success){
        console.log(response.data.message)
        setCount(count+1)
      }
    }catch(err){
      console.log('error occured')
    }
  };

  // Fetch orders on component amount
useEffect(() => {
  fetchAllOrders();
}, [count]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  const itemName = item.name || "Unknown Item";
                  const itemQuantity = item.quantity || 0;
                  if (index === order.items.length - 1) {
                    return itemName + " X " + itemQuantity;
                  } else {
                    return itemName + " X " + itemQuantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
