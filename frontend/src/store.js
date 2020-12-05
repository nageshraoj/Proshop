import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productsListReducer,productsDetailReducer} from './reduces/productsListReducers'
import {cartItemReducer} from "./reduces/cartReducers"
import { userReducer,userRegisterReducer,userDetailsReducer,userUpdateReducer } from './reduces/userReducers';

const reducer = combineReducers({
    ProductsList:productsListReducer,
    ProductDetails:productsDetailReducer,
    cartList:cartItemReducer,
    userLogin:userReducer,
    userRegiser:userRegisterReducer,
    userDetails :userDetailsReducer,
    userUpdate:userUpdateReducer
});

const cartItemsLocalStorage = localStorage.getItem('cartItems') ? JSON.parse( localStorage.getItem('cartItems')):[]

const userInfoLocalStorage = localStorage.getItem('userInfo') ? JSON.parse( localStorage.getItem('userInfo')):null

const shippingAddressLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse( localStorage.getItem('shippingAddress')):null

const paymentMethodLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse( localStorage.getItem('paymentMethod')):null

const orderSubmitLocalStorage = localStorage.getItem('orderSubmit') ? JSON.parse( localStorage.getItem('orderSubmit')):null

const initalState ={
    cartList :{cartItems:cartItemsLocalStorage,shippingAddress:shippingAddressLocalStorage,paymentMethod:paymentMethodLocalStorage,
        orderSubmit:orderSubmitLocalStorage},
    userLogin:{userInfo:userInfoLocalStorage}
};

const middleware =[thunk];

const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
