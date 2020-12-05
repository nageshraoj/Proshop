import axios from 'axios'
import {SAVE_SHIPPING_FAILED,
    SAVE_SHIPPING_REQUEST,
    SAVE_SHIPPING_SUCESS,
    GET_SHIPPING_FAILED,
    GET_SHIPPING_REQUEST,
    GET_SHIPPING_SUCESS
} from "../constants/shippingConstants"



export const saveShipping = ({data}) => async (dispatch)=>{
    try {
        dispatch({type:SAVE_SHIPPING_REQUEST})

        
    } catch (error) {
        dispatch({type:SAVE_SHIPPING_FAILED,
            payload: error.response  && error.response.data.message ? error.response.data.message:error.message})
    }
}

export const getShippingAddress = (id) => async (dispatch)=>{
    try {
        dispatch({type:GET_SHIPPING_REQUEST})
        
        
    } catch (error) {
        dispatch({type:GET_SHIPPING_FAILED,
            payload: error.response  && error.response.data.message ? error.response.data.message:error.message})
    }
}

