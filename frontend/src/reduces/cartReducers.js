import {CART_ITEM_ADD,CART_ITEM_REMOVE,SAVE_SHIPPING_ADDRESS} from "../constants/cartConstants"
import {ORDER_PLACE_FAIL,ORDER_PLACE_REQUEST,ORDER_PLACE_SUCESS} from "../constants/orderConstants"

import {ORDER_PAYMENT_METHOD} from "../constants/cartConstants"

export const cartItemReducer = (state={cartItems: [],shippingAddress:{},orderSubmit:{}},action) =>{
        switch (action.type) {
            case CART_ITEM_ADD:
                 const item = action.payload
                 const existedItem = state.cartItems.find(cartitem=>cartitem.product === item.product)
                 if(existedItem){
                    return {...state, cartItems: state.cartItems.map(cartItem=>cartItem.product===existedItem.product?
                          item:cartItem )};
                 }else{
                    return {...state,cartItems: [...state.cartItems, item]}
                 }
            case CART_ITEM_REMOVE : return{...state, cartItems: state.cartItems.filter(cartitem=>cartitem.product!==action.payload)}
            case SAVE_SHIPPING_ADDRESS: return{...state, shippingAddress: action.payload}
            case ORDER_PAYMENT_METHOD: return{...state, paymentMethod: action.payload}
            case ORDER_PLACE_REQUEST: return{...state,ordersuccess:false, orderSubmit: action.payload}
            case ORDER_PLACE_SUCESS: return{cartItems:[],ordersuccess:true, orderSubmit: action.payload}
            case ORDER_PLACE_FAIL: return{...state,ordersuccess:false, error: action.payload}
            default: return state;
        }
}

