import asyncHandler from "express-async-handler"
import Order from "../models/orderModeul.js";
import User from '../models/usersModel.js'

const orderPlace = asyncHandler(async(req,res)=>{
 const {cartItems, shippingAddress, paymentMethod,CGST,SGST,totalcost,numberofItems,shippingCost } = req.body

 if(!cartItems){
     res.status(400)
     throw new Error('No order items ');
    }

const order = new Order({
    user:req.user._id,
    orderItem:cartItems, 
    shippingAddaress:shippingAddress,
    paymentMethod:paymentMethod,
    cgstPrice:CGST,
    sgstPrice:SGST,
    totalPrice:totalcost,
    numberofItems:numberofItems,
    shippingPrice:shippingCost
})

const createdOrder = await order.save()
res.status(200)
res.json(`Received order ${createdOrder}`)

})

const getListofOrders = asyncHandler(async(req,res)=>{
    const currentUser = await User.findById(req.user._id)
    console.log(currentUser)
    const orders = await Order.findOne({user:currentUser._id})

    console.log(orders);
    if(!orders){
        res.status(400)
        throw new Error('No orders find');
    }
    res.status(200)
    res.json(orders)
})

export {orderPlace,getListofOrders}