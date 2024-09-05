import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    Phone: ""
  });

  const [orderSuccess, setOrderSuccess] = useState(""); // State for order success message
  const navigate = useNavigate(); // Hook for navigation

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        console.log(itemInfo)
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` } // Ensure token is included if required
      });

      if (response.data.success) {
        const orderId = response.data.orderId; // Ensure your API returns this
        navigate(`/order-successful/${orderId}`); // Redirect to order success page with orderId
      } else {
        setOrderSuccess("Error placing order");
      }
    } catch (error) {
      console.error(error);
      setOrderSuccess("Error placing order");
    }
  };

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name='firstName'
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder='First Name'
            />
            <input
              required
              name='lastName'
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder='Last Name'
            />
          </div>
          <input
            required
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Email Address'
          />
          <input
            required
            name='street'
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder='Street'
          />
          <div className="multi-fields">
            <input
              required
              name='city'
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder='City'
            />
            <input
              required
              name='state'
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder='State'
            />
          </div>
          <div className="multi-fields">
            <input
              required
              name='zipcode'
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder='ZipCode'
            />
            <input
              required
              name='country'
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder='Country'
            />
          </div>
          <input
            required
            name='Phone'
            onChange={onChangeHandler}
            value={data.Phone}
            type="text"
            placeholder='Phone'
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
           <div className='button'><Link className='button2' to='/order-successful/:orderId'>Proceed To Checkout</Link></div> 
            {orderSuccess && <p className="order-success-message">{orderSuccess}</p>} {/* Display success message */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
