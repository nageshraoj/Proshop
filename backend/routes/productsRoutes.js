import express from "express"
import {getProducts, getProductbyID,updateProduct} from "../controls/productControler.js"
const productRoutes = express.Router();


productRoutes.route('/').get(getProducts)
productRoutes.route('/:id').get(getProductbyID)
productRoutes.route('/update').put(updateProduct)


export default productRoutes;