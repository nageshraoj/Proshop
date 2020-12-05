import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Form,Button,Col} from "react-bootstrap"
import FormComponent from "../components/FormComponent"
import {getOrderPaymentMethod} from "../actions/cartAction"
import CheckoutSteps from "../components/CheckoutSteps"

const PaymentScreen = ({history}) => {

    const dispatch = useDispatch()
    const userShippingAddress = useSelector(state=>state.cartList)
    const {shippingAddress} = userShippingAddress

    if(!shippingAddress){
        history.push('/Shipping')
    }

    const [paymentMethod,setPaymentMethod] = useState('')
 
    const submitHandler =(e)=>{
        e.preventDefault()
        // const Address = {
        //     address,
        //     city,
        //     state,
        //     pin
        // }
        dispatch(getOrderPaymentMethod(paymentMethod))
        history.push('/PlaceOrder')
    }

    return (
        <>
           <FormComponent>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                     <Form.Group >
                        <Form.Label as="legend">Select Method</Form.Label>
                        <Col>
                            <Form.Check 
                            type="radio" 
                            id="paypal"
                            label='PayPal or Credit Card'
                             name={paymentMethod} 
                            //  checked
                             value="PayPal" 
                            onChange={(e)=>setPaymentMethod(e.target.value)}>
                            </Form.Check>

                            <Form.Check 
                            type="radio" 
                            id="paytm"
                            label='Paytm' 
                            name={paymentMethod} 
                            value="Paytm" 
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                            ></Form.Check>

                            <Form.Check 
                            type="radio" 
                            id="googlepay"
                            label='Google Pay' 
                            name={paymentMethod} 
                            value="GooglePay" 
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Form.Group>

                    {
                        paymentMethod?
                        <Button type="submit" variant="info">Place Order</Button>:
                        <Button disabled >Place Order</Button>
                    }
                   
                </Form>
        </FormComponent>
        </>
    )
}

export default PaymentScreen
