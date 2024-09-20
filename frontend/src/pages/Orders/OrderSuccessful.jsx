import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderSuccessful.css';
import { StoreContext } from '../../context/StoreContext';

const OrderSuccessful = () => {
  const { orderId } = useParams(); 
  const [timer, setTimer] = useState(60); 
  const navigate = useNavigate();
  const {setOrderItems,setAddress,setCartItems} = useContext(StoreContext)

  // Using useEffect to handle the countdown and navigation when the timer expires
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          clearInterval(interval); // Stop the timer when it reaches 0
          navigate('/order-placed'); // Redirect when the timer expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Decrement every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [navigate]); // Dependencies: Only navigate is used here

  // Function to handle the order cancellation
  const handleCancelOrder = async () => {
    setCartItems({})
    setOrderItems([])
    setAddress({})
    navigate('/order-cancellation')
  };

  return (
    <div className="order-successful">
      <h1>Order Placed Successfully</h1>
      <p>Your order has been placed successfully. It will be processed shortly.</p>
      <p>Order can be cancelled within: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>

      
      <div className="button2">
        {timer > 0 ? (
          // Render the "Cancel Order" button if the timer has not expired
          <button className="button" onClick={handleCancelOrder}>Cancel Order</button>
        ) : (
          // Disable the "Cancel Order" button when the timer expires
          <button className="button disabled" disabled>Cancel Order</button>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessful;
