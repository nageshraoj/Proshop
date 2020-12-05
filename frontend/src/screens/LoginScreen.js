import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import {Form,Button,Row,Col} from "react-bootstrap"
import {loginUser} from "../actions/userActions"
import FormComponent from "../components/FormComponent"
import Message from '../components/Message'
import Loader from '../components/Loader'


const LoginScreen = ({location,history}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1]:'/'

    const dispatch =useDispatch()

    const  userLogin= useSelector(state=>state.userLogin)
   
    const {error, loading,userInfo}  = userLogin


    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }

    },[userInfo,history,redirect])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(loginUser(email,password))
    }

    return (
        <>
            <FormComponent>
                <h1>Sign In</h1>
                {error && <Message varient="danger" message={error}/> }
                  {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId={email}>
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="Pleae enter email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId={password}>
                        <Form.Control 
                            type="password"
                            placeholder="Pleae enter password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                        <Button type="submit" variant="info">Submit</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer?{' '}
                        <Link to='/Register'>
                        Regisger
                        </Link>
                    </Col>
                </Row>
            </FormComponent>
        </>
    )
}

export default LoginScreen
