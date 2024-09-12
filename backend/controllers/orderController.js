import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order Function
const placeOrder = async (req, res) => {
  const frontend_url="http://localhost:5173"
  let { userId, items, amount, address } = req.body;
  console.log(items)
  try {
    // Create and save a new order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    if(newOrder){
    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare line items for payment
    const line_items = newOrder.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // Ensure this multiplier is correct
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80, // Ensure this value is correct
      },
      quantity: 1,
    });

    console.log("Order placed successfully");
    res.status(200).json({ success: true });
  }
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: error.message || "Error placing order" });
  }
};

// Fetch User Orders Function
const userOrders = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "UserID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid UserID format" });
  }

  try {
    // Fetch orders by userId
    const orders = await orderModel.find({ userId });

    console.log('Orders:', orders);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

//Listing orders fro admin panel
const listOrders=async (req,res)=>{
  try {
    const orders= await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
    
  }

}
//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
    
  }
};



export { placeOrder, userOrders, listOrders, updateStatus };
