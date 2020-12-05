import JWT from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/usersModel.js"

const protect = asyncHandler(async (req,res,next) =>{

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            let token = req.headers.authorization.split(' ')[1]
            const decodedtoken = JWT.decode(token,process.env.JWT_SCRET)
            console.log(decodedtoken)
            req.user = await User.findById(decodedtoken.id).select('-password')
            next()
        } catch (error) {
            res.status(404)
            throw new Error('Not authorized token failed')
        }
    } else{
        console.log('Token not found');
        res.status(404)
        throw new Error('Not authorized No token')
        next()
    }
    // console.log(req.headers.authorization);
})

export {protect}