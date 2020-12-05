import express from "express"
import {orderPlace,getListofOrders} from "../controls/orderControler.js"
import { protect } from "../middleware/autoHandler.js";
const orderRoutes = express.Router();


orderRoutes.route('/').post(protect, orderPlace)
orderRoutes.route('/list').get(protect,getListofOrders)

export default orderRoutes;