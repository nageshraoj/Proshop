import express from "express"
import {authUser,getUserProfile,registerUser, updateUserProfile} from "../controls/userControler.js"
import { protect } from "../middleware/autoHandler.js"

const authRouter = express.Router()

authRouter.post('/login',authUser)

authRouter.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)

authRouter.post('/',registerUser)



export default authRouter