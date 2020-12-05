import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import {Col,Row,Image,Card,ListGroup,Button} from "react-bootstrap"
import Loader from '../components/Loader';
import Message from '../components/Message';
import CheckoutSteps from "../components/CheckoutSteps"
import FormComponent from '../components/FormComponent';
import {newOrderSubmit} from "../actions/orderAction"

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()
    
    const cartListItems = useSelector(state=>state.cartList)

    const {cartItems, shippingAddress,paymentMethod,ordersuccess} = cartListItems

    const totalcost = cartItems?cartItems.reduce((acc,item)=> acc + item.qty * item.price,0).toFixed(2):0

    const numberofItems = cartItems?cartItems.reduce((acc,item)=> acc + item.qty,0):0

    const CGST = totalcost?totalcost/8:0
    const SGST = totalcost?totalcost/8:0
    const shippingCost = 0

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
      })
    
    //   console.log(shippingAddress.address)
    //   if(typeof shippingAddress.address === "undefined"){
    //     history.push('/Shipping')
    // }
    //   useEffect(()=>{
    //       console.log(ordersuccess)
    //     if(ordersuccess){
    //         history.push('/')
    //     }
       
    //   },[history,ordersuccess,shippingAddress])

    const placeOrder =() =>{
        const orderDetails ={
            cartItems,
            shippingAddress,
            paymentMethod,
            CGST,
            SGST,
            totalcost,
            numberofItems,
            shippingCost
        }
        dispatch(newOrderSubmit(orderDetails))
        history.push('/')
    }

    return (
        <>
            
                 <CheckoutSteps step1 step2 step3 />
                 <Row>
                     <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                    <p>
                                        <strong>Address :</strong>
                                        {shippingAddress.address}
                                        {shippingAddress.city}
                                        {shippingAddress.state} - 
                                        {shippingAddress.pin}
                                    </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Payment :</strong>
                                    {paymentMethod}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                    <h2>Order Items</h2>
                                {
                                    cartItems<0?<Message varient="danger" message="No items found"/>: (
                                        <ListGroup variant="flush">
                                            {
                                                cartItems.map(cartItem=>(
                                                <ListGroup.Item key={cartItem.product}>
                                                    <Row>
                                                        <Col md={3}>
                                                            <Image src={cartItem.image}
                                                            alt={cartItem.name}
                                                            fluid
                                                            rounded
                                                            />
                                                        </Col>
                                                        <Col md={5}>
                                                          <Link to={`/Products/${cartItem.product}`}> {cartItem.name} </Link> 
                                                        </Col>
                                                        <Col md={4}>
                                                        {cartItem.qty} X  {formatter.format(cartItem.price)} = {formatter.format(cartItem.qty * cartItem.price)}
                                                        </Col>
                                                    </Row>
                                                
                                                </ListGroup.Item>
                                                )

                                                )
                                            }
                                        </ListGroup>
                                    )
                                }
                            </ListGroup.Item>
                        </ListGroup>
                     </Col>

                     <Col md={4}>
                         <Card>
                             <ListGroup variant="flush">
                                 <ListGroup.Item>
                                     <h2>Order Summary</h2>
                                 </ListGroup.Item>

                                 <ListGroup.Item>
                                     <Row>
                                         <Col>
                                            Items
                                         </Col>
                                         <Col style={{textAlign:"center"}}>
                                         {numberofItems} 
                                         </Col>
                                     </Row>
                                 </ListGroup.Item>

                                 <ListGroup.Item>
                                     <Row>
                                         <Col>
                                            Ordder Cost
                                         </Col>
                                         <Col style={{textAlign:"right"}}>
                                         {formatter.format(totalcost-CGST-SGST)}
                                         </Col>
                                     </Row>
                                 </ListGroup.Item>

                                 <ListGroup.Item>
                                     <Row>
                                         <Col>
                                            SGST
                                         </Col>
                                         <Col style={{textAlign:"right"}}>
                                            {formatter.format(SGST)}
                                         </Col>
                                     </Row>
                                 </ListGroup.Item>

                                 <ListGroup.Item>
                                     <Row>
                                         <Col>
                                            CGST
                                         </Col>
                                         <Col style={{textAlign:"right"}}>
                                            {formatter.format(CGST)}
                                         </Col>
                                     </Row>
                                 </ListGroup.Item>

                                 <ListGroup.Item>
                                     <Row>
                                         <Col>
                                            Shipping Cost
                                         </Col>
                                         <Col style={{textAlign:"right"}}>
                                            {formatter.format(shippingCost)}
                                         </Col>
                                     </Row>
                                 </ListGroup.Item>

                                 <ListGroup.Item>
                                     <Row>
                                         <Col>
                                            Total Cost
                                         </Col>
                                         <Col style={{textAlign:"right"}}>
                                         {formatter.format(totalcost)}
                                         </Col>
                                     </Row>
                                 </ListGroup.Item>

                                 <ListGroup.Item>
                                     {
                                         cartItems?
                                         <Button
                                         type="button"
                                      variant="info"
                                      onClick={()=>placeOrder()}
                                      className="btn-block">Place Order</Button>:
                                      <Button type="button"  className="btn-block" disabled>Place Order</Button>
                                     }
                                     
                                 </ListGroup.Item>
                             </ListGroup>
                         </Card>
                     </Col>
                 </Row>
        </>
    )
}

export default PlaceOrderScreen
