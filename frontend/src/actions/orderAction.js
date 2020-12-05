import axios from "axios"
import {ORDER_PLACE_FAIL,ORDER_PLACE_REQUEST,ORDER_PLACE_SUCESS} from "../constants/orderConstants"


export const newOrderSubmit = (orderDetails) => async (dispatch,getState)=>{
    try {
        dispatch({type:ORDER_PLACE_REQUEST});

        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type':"application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('/api/order',orderDetails,config)
        dispatch({type:ORDER_PLACE_SUCESS,payload:data})
        localStorage.setItem('orderSubmit',JSON.stringify(''))
       
    } catch (error) {
        dispatch({type:ORDER_PLACE_FAIL,
            payload: error.response  && error.response.data.message ? error.response.data.message:error.message})
    }

}