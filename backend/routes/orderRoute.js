import express from "express"
import authmiddleware from "../middlewear/auth.js"
import { listOrders, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authmiddleware,placeOrder)
orderRouter.post("/userorders",authmiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;