import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Row,Col,ListGroup,Image, Button,Form, Card} from "react-bootstrap"
import {getCartItems,removeFromCart} from "../actions/cartAction"
import { Link } from 'react-router-dom'
import Message from '../components/Message'

const CartScreen = ({match,location,history}) => {

    const dispatch = useDispatch()

    const id = match.params.id
    const qty = location.search?Number(location.search.split(':')[1]):0

    const getItems = useSelector(state=>state.cartList)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const {cartItems} = getItems;

    console.log(cartItems);

    useEffect(()=>{
        if(id){
        dispatch(getCartItems(id,qty))
        }
    },[dispatch,id,qty])


    const removeItemfromCart =(id)=>{
        dispatch(removeFromCart(id));
    }

    const checkOutHandler =()=>{
        if(userInfo){
            history.push('/Shipping')
        }else{
        history.push('/User?redirect=shipping')
          }
    }

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
      })

    return (
        <>

     
        <h1>Shopping Cart</h1>
            {
           cartItems && cartItems.length?
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                    {
                    cartItems.map(cartitem=>(
                        <ListGroup.Item key={cartitem.product}>
                            <Row>
                                <Col md={2}>
                                    <Image 
                                    alt={cartitem.name}
                                    src={cartitem.image}
                                    fluid
                                    rounded
                                    />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/products/${cartitem.product}`}>{cartitem.name}</Link>
                                </Col>
                                <Col md={2}>
                                      {formatter.format(cartitem.price)}
                                </Col>
                                <Col md={2}>
                                <Form.Control value={cartitem.qty} 
                                        as="select"
                                        onChange={(e)=>dispatch(getCartItems(cartitem.product,Number(e.target.value)))} >
                                        {[...Array(cartitem.countInStock).keys()].map(num => (
                                            <option key={num+1} value={num + 1}>{num +1 }</option>
                                        )
                                        )}
                                        </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button 
                                        variant="light"
                                        type="button"
                                        onClick={()=>removeItemfromCart(cartitem.product)}
                                    >
                                        <i className="fas fa-trash"></i>
                                        </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                    }
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup.Item>
                            <h2>Sub Total:
                                ({cartItems.reduce((acc,item)=> acc + item.qty,0)}) items
                                </h2>
                                {formatter.format(cartItems.reduce((acc,item)=> acc + item.qty * item.price,0).toFixed(2))}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" 
                            variant="info" 
                            onClick={checkOutHandler}
                            className="btn-block" >Check Out</Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
                </Row>
           :
            <>
            <Message message="Cart is empty"/>
            <Link to='/'><Button variant="info">Back</Button></Link>
            </>
            }
        </>
    )
}

export default CartScreen
