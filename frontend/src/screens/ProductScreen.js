import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";
import {Row, Col, ListGroup, Card, Image, Button, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {getproductDetail} from '../actions/productsAction'
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({history, match}) => {

    const [qty,setQty] = useState(1)
   

    const dispatch = useDispatch()

    const getproduct = useSelector(state=>state.ProductDetails)

   

    useEffect(()=>{
        dispatch(getproductDetail(match.params.id))
 
    },[dispatch,match]);

    const {loading, error, product} = getproduct

    const addToCartHandler = () =>{
        history.push(`/Cart/${match.params.id}?Qty:${qty}`)
    }
  
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
      })

    return (
        <>
            <Link to="/" className="btn btn-success my-3">Go Back</Link>
            {
                loading?<Loader/>:error?<Message varient="danger" message={error}/>:
                
            <Row>
                <Col  md={6} >
                    <Image alt={product.name} src={product.image} fluid />
                </Col>
                <Col  md={3} >
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <Rating
                                 rating={product.rating}
                                  numReviews={product.numReviews}
                         />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Price $ {product.price}</h3>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                           Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col> <strong> {formatter.format(product.price)} </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Stock: </Col>
                                    <Col>{product.countInStock>0?"In Stock":"Out of Stock"}</Col> 
                                </Row>
                            </ListGroup.Item>

                            {
                              product.countInStock>0 >0 && (
                                <ListGroup.Item>
                                <Row>
                                    <Col>Qty: </Col>
                                    <Col><Form.Control value={qty} 
                                    as="select"
                                    onChange={(e)=>setQty(e.target.value)} >
                                    {[...Array(product.countInStock).keys()].map(num => (
                                        <option key={num+1} value={num + 1}>{num +1 }</option>
                                    )
                                    )}
                                    </Form.Control>
                                   </Col> 
                                </Row>
                                </ListGroup.Item>
                            )

                            }
                            <ListGroup.Item>
                                {
                                    product.countInStock?
                                    <Button onClick={addToCartHandler} className="btn-block btn-info"  type="button">Add to Cart</Button>:
                                    <Button className="btn-block btn-light" disabled type="button">Not Available</Button>
                                }
                                </ListGroup.Item>
                        </ListGroup>
                   
                    </Card>
                </Col>
            </Row>
            }
        </>
    )
}

export default ProductScreen
