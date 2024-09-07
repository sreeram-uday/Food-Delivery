import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



//Placing user Order from Frontend
const placeOrder= async (req,res)=>{
    console.log(req.body.userId)
    const frontend_url= "http://localhost:5173";
    try {
        const newOrder= new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        if(newOrder){
        await newOrder.save();
        console.log(req.body.items)
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
        console.log('suc')
        res.status(200).json({success:true})
    }
    else{
        console.log('invalid')
        throw new Error('invalid')
    }


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}


export {placeOrder};