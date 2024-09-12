import React, { useContext, useEffect, useState } from 'react';
import './OrderPlaced.css'; // Add styling if needed
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { OrderCard } from './OrderCard';

const OrderPlaced = () => {
  const {address,orderItems,setOrderItems,url,token,getTotalCartAmount,setCartItems} = useContext(StoreContext)
  const [orderSuccess, setOrderSuccess] = useState(false); // State for order success message
  const nav = useNavigate()
  console.log('address',address)
  console.log('latestorder',orderItems)
  useEffect(()=>{
    placeorder()
  },[])
  const placeorder = async()=>{
    if(orderItems.length===0){
    nav('/')
    }
    let orderData = {
      address: address,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      console.log('before function call')
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {token} // Ensure token is included if required
      });

      if (response.data.success) {
        const orderId = response.data.orderId; // Ensure your API returns this
        console.log('success')
        setOrderSuccess(true)
        setOrderItems([])
        setCartItems({})
      }
    } catch (error) {
      console.log('not success');
      setOrderSuccess(false);
    }
  }
  return (
    <div className="order-placed">
      {
        orderSuccess ? 
        (
        <h1 color='green'>Order placed Successfully</h1>

        ):
        <p>Error in placing order</p>
      }
      
    </div>
  );
};

export default OrderPlaced;
