import express from "express"
import { addtoCart,removeCart,  getCart } from "../controllers/cartController.js"
import authmiddleware from "../middlewear/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authmiddleware,addtoCart)
cartRouter.post("/remove",authmiddleware,removeCart)
cartRouter.post("/get",authmiddleware, getCart)


export default cartRouter;
