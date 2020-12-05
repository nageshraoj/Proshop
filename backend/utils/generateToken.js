import jwtToken from "jsonwebtoken"


const generateToken = (id) =>{
    return jwtToken.sign({id},process.env.JWT_SCRET,{
        expiresIn:"30m"
    })
}

export default generateToken