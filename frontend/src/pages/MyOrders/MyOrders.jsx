// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios'; // Import axios for HTTP requests
// import './MyOrders.css';
// import { StoreContext } from '../../context/StoreContext.jsx';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {
//   const {url, token} = useContext(StoreContext);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         console.log('Fetching orders with token:', token); // Debug log
//         const response = await axios.post(
//           `${url}/api/order/userorders`,
//           {}, // Request body is empty
//           { headers: { Authorization: `Bearer ${token}` } } // Adjust header as needed
//         );
//         console.log('Orders fetched:', response.data); // Debug log
//         setData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error); // Debug log
//       }
//     };

//     if (token) {
//       fetchOrders();
//     }
//   }, [token, url]);

//   return (
//     <div>
//     <h2>My Orders</h2>
//     <div>
//       {data.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         data.map((order, index) => {
//           return (
//             <div key={index}>
//               <img src={assets.parcel_icon} alt="Parcel" />
//               <p>
//                 {order.items.map((item, itemIndex) => {
//                   return (
//                     <span key={itemIndex}>
//                       {item.name} X {item.quantity}
//                     </span>
//                   );
//                 })}
//               </p>
              
//             </div>
//           );
//         })
//       )}
//     </div>
//   </div>
    
//   );
// };

// export default MyOrders;
import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const MyOrders = () => {

  const {url,token}= useContext(StoreContext)
  const [data,setData]= useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // Ensure correct header
      );
      console.log('Orders fetched:', response.data); // Debug log
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  

  useEffect(()=>{
    if (token) {
      fetchOrders();
      
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p></p>
            </div>
          )

        })}
      </div>
      
    </div>
  )
}

export default MyOrders

