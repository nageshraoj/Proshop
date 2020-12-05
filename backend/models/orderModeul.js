import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    orderItem: [
        {
            name:{type:String, required:true},
            qty:{type:Number,required:true},
            image:{type:String,required:true},
            price :{type:Number,required:true},
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Product"
            }

        }],
    shippingAddaress:{
            address:{type:String, required:true},
            city:{type:String, required:true},
            state:{type:String, required:true},
            pin:{type:String, required:true}
    },
    paymentMethod:{
        type:String,
        required:true
    },
    PaymentResult:{
       id:{type:String},
       status:{type:String},
       update_time:{type:String},
       email:{type:String} 
    },
    numberofItems:{
        type:Number,
        required:true,
        default: 0
    },
    cgstPrice:{
        type:Number,
        required:true,
        default: 0.0
    },
    sgstPrice:{
        type:Number,
        required:true,
        default: 0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default: 0.0
    },
   totalPrice:{
        type:Number,
        required:true,
        default: 0.0
    },
    PaidOn:{
        type:Boolean,
        required:true,
        default: false
    },
    isPaidDate:{
        type:Date
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default: false
    },
    DeliverOn:{
        type:Date
    },
},{
    timestamps:true
})

const Order = mongoose.model("Order", orderSchema);

export default Order;