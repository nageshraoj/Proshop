import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Rating from "./Rating";

const Product = ({product}) => {

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
      })

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/Products/${product._id}`}>
                 <Card.Img src={product.image} variant="top"/>
            </Link>
            <Card.Body>
            <Link to={`/Products/${product._id}`}>
                <Card.Title as="div"> 
                <strong> {product.name}</strong>  
                </Card.Title>
            </Link>
   
                <Card.Text as="div">
                    <Rating
                     rating={product.rating}
                     numReviews={product.numReviews}
                    />
                 </Card.Text>
                <Card.Text as="h5"> {formatter.format(product.price)} </Card.Text>
            </Card.Body>
          
        </Card>
    )
}

export default Product
