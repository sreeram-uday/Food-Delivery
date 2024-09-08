import express from "express"
import authmiddleware from "../middlewear/auth.js"
import { placeOrder, userOrders } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authmiddleware,placeOrder)
orderRouter.post("/userorders",authmiddleware,userOrders)

export default orderRouter;