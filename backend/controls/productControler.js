import asyncHandler from "express-async-handler"
import productModel from "../models/productModel.js";

// @desc - Get all products
// @route - /api/products
// @access - public
const getProducts = asyncHandler( async (req,res)=>{
    const products = await productModel.find({})
       // res.status(404)
    // res.json('Not authroze');
    res.json(products)
})

// @desc - Get Singe product
// @route - /api/products/:id
// @access - public
const getProductbyID = asyncHandler( async (req,res)=>{
    const product = await productModel.findById(req.params.id)
    if(product) {
        res.status(200).json(product);
       }
       else {
       res.status(404);
        throw new Error(`Invalid product with ${req.params.id}`);
           }
})

// @desc - Get Singe product
// @route - /api/products/:id
// @access - public
const updateProduct = asyncHandler( async (req,res)=>{
    const {id,orderedItems} = req.body
    const product = await productModel.findById(id)
    const countStock = product.countInStock
    product.countInStock = countStock - orderedItems

    if(product) {
        await product.save()
        res.status(200).json(product)
       }
       else {
       res.status(404);
        throw new Error(`Invalid product with ${req.params.id}`);
           }
})
export {getProducts, getProductbyID,updateProduct}