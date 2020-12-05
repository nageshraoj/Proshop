import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
 
const userAddressSchema=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        shippingAddaress:{
            address:{type:String, required:true},
            city:{type:String, required:true},
            state:{type:String, required:true},
            pin:{type:String, required:true}
    },
    },{
        timestamps:true,
    }
)
 

const UserAddress = mongoose.model('UserAddress', userAddressSchema)
 
export default UserAddress
