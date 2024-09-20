import path from "path";
import express from 'express'; 
import cors from 'cors'; 
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config.js'; // Make sure your .env file is properly configured

const app = express(); 

// Middleware
app.use(express.json()); 
app.use(cors()); // Enable CORS for cross-origin resource sharing

// Connect to the database
connectDB();
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
  res.send('Server Started');
});

const port = process.env.PORT || 4000; 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
