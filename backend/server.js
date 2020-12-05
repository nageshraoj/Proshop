import express from "express";
import dotenv from "dotenv";
import colors from 'colors';
import ConnectDB from './config/db.js'
import productRoutes from "./routes/productsRoutes.js";
import {notFoundError, statusError} from "./middleware/errorHandler.js"
import authRouter from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express();

app.use(express.json())
dotenv.config();
ConnectDB();
// const products = require('./data/products');

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`server is listing at port ${PORT} in ${process.env.NODE_ENV}`.yellow.bold);
});

app.use('/api/products',productRoutes)
app.use('/api/users',authRouter)
app.use('/api/order',orderRoutes)

app.use(notFoundError)

app.use(statusError);

app.get("/",(req,res)=>{
    res.send('You are in root');
})
