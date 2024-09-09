import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderSuccessful.css';

const OrderSuccessful = () => {
  const { orderId } = useParams(); 
  const [timer, setTimer] = useState(3); 
  const navigate = useNavigate();

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
    try {
      const response = await fetch('/api/order/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }), // Send the orderId to the server for cancellation
      });

      const result = await response.json();
      if (result.success) {
        alert('Order cancelled successfully');
        navigate('/order-cancellation'); // Redirect to the cancellation page if successful
      } else {
        alert('Error cancelling order');
      }
    } catch (error) {
      alert('An error occurred while cancelling the order');
    }
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
