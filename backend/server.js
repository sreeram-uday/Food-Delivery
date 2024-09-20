// server.js
import path from "path";
import express from 'express'; 
import cors from 'cors'; // Import CORS
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express(); // Create an Express application

// Middleware
app.use(express.json()); 
app.use(cors()); // Use CORS middleware

// Connect to the database
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


// Define routes
app.get('/', (req, res) => {
  res.send('Server Started');
});

// Set the port
const port = 4000; 
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use(express.static(path.join(__dirname, "/admin/dist")));

app.get('/frontend/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Handle admin routes
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



//mongodb+srv://Abhi_45:Abhi459_145@cluster0.vdq8m.mongodb.net/?
