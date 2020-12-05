import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";




const App =()=> {
  return (
    <BrowserRouter>
      <Header/>
        <main className="py-3">
            <Container>
              <Route path="/" exact component={HomeScreen}/>
              <Route path="/Products/:id" component={ProductScreen}/>
              <Route path="/Cart/:id?" component={CartScreen}/>
              <Route path="/User" component={LoginScreen}/>
              <Route path="/Register" component={RegisterScreen}/>
              <Route path="/Profile" component={ProfileScreen}/>
              <Route path="/Shipping" component={ShippingScreen}/>
              <Route path="/Payment" component={PaymentScreen}/>
              <Route path="/Placeorder" component={PlaceOrderScreen}/>
            </Container>
        </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
