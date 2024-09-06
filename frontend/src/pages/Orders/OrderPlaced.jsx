import React, { useContext, useEffect, useState } from 'react';
import './OrderPlaced.css'; // Add styling if needed
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const OrderPlaced = () => {
  const {address,orderItems,url,token,getTotalCartAmount} = useContext(StoreContext)
  const latestOrder = orderItems[orderItems.length-1]
  const [orderSuccess, setOrderSuccess] = useState(false); // State for order success message
  console.log('address',address)
  console.log('latestorder',latestOrder)
  useEffect(()=>{
    placeorder()
  },[])
  const placeorder = async()=>{
    let orderData = {
      address: address,
      items: latestOrder,
      amount: getTotalCartAmount() + 2,
    };

    try {
      console.log('before function call')
      const response = await axios.post(`${url}/api/order/place`, orderData);

      if (response.data.success) {
        const orderId = response.data.orderId; // Ensure your API returns this
        console.log('success')
      }
    } catch (error) {
      console.log('not success');
      setOrderSuccess(false);
    }
  }
  return (
    <div className="order-placed">
      {
        orderSuccess ? (<>
          
          <h1>Order Placed Successfully</h1>
        <p>Your order has been placed successfully. Thank you for your purchase!</p>
        </>
        ):
        <p>Error in placing order</p>
      }
      
    </div>
  );
};

export default OrderPlaced;
