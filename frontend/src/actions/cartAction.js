import axios from 'axios';
import {CART_ITEM_ADD,CART_ITEM_REMOVE,SAVE_SHIPPING_ADDRESS,GET_SHIPPING_FAILED,  ORDER_PAYMENT_METHOD} from '../constants/cartConstants'

export const getCartItems = (id,Qty) => async (dispath, getState)=>{
    const {data} = await axios.get(`/api/products/${id}`)
    dispath({type:CART_ITEM_ADD, 
        payload:{
       product :  id,
       image : data.image,
       name : data.name,
       price :data.price,
       countInStock : data.countInStock,
       qty: Qty
       }})
       localStorage.setItem('cartItems',JSON.stringify(getState().cartList.cartItems))
}

export const removeFromCart = (id) =>  (dispath, getState) =>{
    dispath({
        type:CART_ITEM_REMOVE,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cartList.cartItems))
}

export const saveShippingAddress =(data)=>(dispatch)=>{
    dispatch({type:SAVE_SHIPPING_ADDRESS, payload:data})
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const getOrderPaymentMethod = (data) => async (dispatch)=>{
    try {
        dispatch({type:ORDER_PAYMENT_METHOD,payload:data})
        localStorage.setItem('paymentMethod',JSON.stringify(data))
    } catch (error) {
        dispatch({type:GET_SHIPPING_FAILED,
            payload: error.response  && error.response.data.message ? error.response.data.message:error.message})
    }
}