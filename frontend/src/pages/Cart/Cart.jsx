import React, { useContext } from "react"; 
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, setCartItems,token } = useContext(StoreContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    
    try {
      console.log('cart-tems',cartItems)
      const userId = 'yourUserId'; // Replace with actual user ID
      const amount = getTotalCartAmount(); // Calculate the total amount
      const address = 'userAddress'; // Replace with actual address or obtain from a form
  
      // Send a request to the backend to place the order
      await axios.post('http://localhost:4000/api/order/place', {
        userId,
        items: cartItems,
        amount,
        address
      },{headers:{token}});
  
      // Clear the cart and update state // or your method to clear the cart
  
      // Navigate to the order confirmation page
      navigate('/order');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}> 
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; 
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={handlePlaceOrder}>Proceed To Check Out</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you Have Promo Code, Add it Here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
