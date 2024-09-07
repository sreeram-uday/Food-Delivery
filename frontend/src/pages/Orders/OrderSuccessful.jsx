import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './OrderSuccessful.css';
// Ensure the URL import is correct and used if needed
// import { url } from '../../../../admin/src/assets/assets';

const OrderSuccessful = () => {
  const { orderId } = useParams(); // Get the orderId from URL parameters
  const [timer, setTimer] = useState(10); // 5 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          navigate('/order-placed'); // Redirect when timer expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleCancelOrder = async () => {
    try {
      const response = await fetch('/api/order/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Order cancelled successfully');
        navigate('/order-cancellation');
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
      <div className='button2'>
        {/* Conditionally render the link based on the timer */}
        {timer > 0 ? (
          <Link className='button' to='/order-cancellation'>Cancel Order</Link>
        ) : (
          <span className='button disabled'>Cancel Order</span>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessful;
