import asyncHandler from 'express-async-handler'
import User from '../models/usersModel.js'
import generateToken from '../utils/generateToken.js'
 
//@desc     Auth user & get Token
//@rout     Post /api/products
//@access   Public
const authUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
         res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
 
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

const getUserProfile = asyncHandler(async(req,res)=>{
    const user =  await User.findById(req.user._id).select('-password')
    if(user){
    res.json(user)
    } else{
        res.status(404)
        throw new Error('Invalid User')
    }
})

const registerUser = asyncHandler(async(req,res)=>{

    const {name, email,password} = req.body
    const userExist = await User.findOne({email})
    
    if(userExist)
    {
        res.status(400)
        throw new Error('User already exist')
    } 

    const userCreated=  await  User.create({
        name,
        email,
        password
        })

        if(userCreated){
            res.status(200)
            res.json({
                _id: userCreated._id,
                name: userCreated.name,
                email: userCreated.email,
                isAdmin: userCreated.isAdmin,
                token: generateToken(userCreated._id)
            })
            res.json('Sucessfully created user')

        } else {
            res.status(404)
            res.json('Unable to create user')
        }
        // res.json(`Will add user as per request ${name} ${email1} ${password}`)
    


})

const updateUserProfile = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id)

    if(!user){
        res.status(400)
        throw new Error('User does not exist')
    }
    
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin
    if( req.body.password ) {
        user.password = 
        req.body.password }

    const userUpdated=  await  user.save()

        if(userUpdated){
            res.status(200)
            res.json({
                _id: userUpdated._id,
                name: userUpdated.name,
                email: userUpdated.email,
                isAdmin: userUpdated.isAdmin,
                token: generateToken(userUpdated._id)
            })
            res.json('Sucessfully Updated user')

        } else {
            res.status(404)
            res.json('Unsucssful to update user')
        }
})
 
export {authUser,getUserProfile,registerUser,updateUserProfile}