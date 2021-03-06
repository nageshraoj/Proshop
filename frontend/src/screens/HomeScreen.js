import React,{ useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row,Col} from "react-bootstrap";
import Product from "../components/Product"
import {getproductlist} from '../actions/productsAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state=>state.ProductsList);

    const {loading, error, products} = productList;

    useEffect(()=>{
     dispatch(getproductlist());
    },[dispatch])


    return (
        <>
            <h1>List of products</h1>
            <Row>
                {
                    loading?<Loader/>:error?<Message varient="danger" message={error}/>:
                    products.map(product=>(
                       <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                           <Product product={product}/>
                       </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default HomeScreen
