import mongoose from "mongoose";
import colors from 'colors';
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import orderModel from "./models/orderModeul.js";
import productModel from "./models/productModel.js";
import userModel from "./models/usersModel.js";
import connectDB from "./config/db.js"

dotenv.config();

connectDB()

const importData = async()=>{
    try {
        await orderModel.deleteMany();
        await productModel.deleteMany();
        await userModel.deleteMany();

        const getusers = await userModel.insertMany(users);
        const adminuser = getusers[0]._id;

        const productList = products.map(product=>{
            return{
                user: adminuser,
                ...product
            }
        });

        await productModel.insertMany(productList);
        console.log('data updated'.green.bold);
        process.exit(0);
    } catch (error) {
        
        console.log(`${error}`.red.bold);
        process.exit(1);
    }
}

const distroyData = async() =>{
    try {
        await productModel.deleteMany();
        await userModel.deleteMany();
        await orderModel.deleteMany();

        console.log('Data distroyed'.green.bold);
        process.exit(0);
    } catch (error) {
        console.log(`${error}`.red.bold);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    distroyData();
} else {
    importData();
}