import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user Order from Frontend
const placeOrder = async (req, res) => {
  console.log(req.body.userId);
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    if (newOrder) {
      await newOrder.save();
      console.log(req.body.items);
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100 * 80,
        },
        quantity: item.quantity,
      }));

      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: 2 * 100 * 80,
        },
        quantity: 1,
      });

      console.log("Order successful");
      res.status(200).json({ success: true });
    } else {
      console.log("Invalid order");
      throw new Error("Invalid order");
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetching user orders
const userOrders = async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ success: false, message: "UserID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid UserID format" });
  }

  try {
    // Correctly query orders by userId
    const orders = await orderModel.find({ userId: new mongoose.Types.ObjectId(userId) });

    console.log('Orders:', orders); // Debugging line

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};


export { placeOrder, userOrders };
