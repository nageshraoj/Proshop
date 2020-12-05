import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Form,Button} from "react-bootstrap"
import FormComponent from "../components/FormComponent"
import {saveShippingAddress} from "../actions/cartAction"
import CheckoutSteps from "../components/CheckoutSteps"


const ShippingScreen = ({history}) => {
   

    const dispatch = useDispatch()
    const userShippingAddress = useSelector(state=>state.cartList)
    const {shippingAddress} = userShippingAddress

    console.log(shippingAddress);

  
        const [address,setAddress] = useState(shippingAddress?shippingAddress.address:'')
        const [city,setCity] = useState(shippingAddress?shippingAddress.city:'')
        const [state,setState] = useState(shippingAddress?shippingAddress.state:'')
        const [pin,setPin] = useState(shippingAddress?shippingAddress.pin:'')

    const submitHandler =(e)=>{
        e.preventDefault()
        const Address = {
            address,
            city,
            state,
            pin
        }
        dispatch(saveShippingAddress(Address))
        history.push('/Payment')
    }
    return (
        <FormComponent>
            <CheckoutSteps step1 step2 />
            <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                     <Form.Group controlId={address}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Pleae enter address"
                            value={address}
                            required
                            onChange={(e)=>setAddress(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId={city}>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Pleae enter city"
                            value={city}
                            required
                            onChange={(e)=>setCity(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId={state}>
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Pleae enter state"
                            value={state}
                            required
                            onChange={(e)=>setState(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId={pin}>
                        <Form.Label>Pin</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Pleae enter pin"
                            value={pin}
                            required
                            onChange={(e)=>setPin(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                        <Button type="submit" variant="info">Proceed to payment</Button>
                      
                
                </Form>
        </FormComponent>
    )
}

export default ShippingScreen
