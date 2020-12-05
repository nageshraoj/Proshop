import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import {Form,Button,Row,Col} from "react-bootstrap"
import {userRegister} from "../actions/userActions"
import FormComponent from "../components/FormComponent"
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({history,location}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [comfirmpassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()
    const  userLogin= useSelector(state=>state.userRegiser)
   
    const {error, loading,userInfo}  = userLogin

    console.log(error);

    const redirect = location.search ? location.search.split('=')[1]:'/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[userInfo,history,redirect])

    const submitHandler =(e)=>{
        e.preventDefault()
        if(password!==comfirmpassword){
                setMessage('Password mismatch')
        }
        else{
        dispatch(userRegister(name,email,password))
    }
    }


    return (
        <>
               <FormComponent>
               <h1>Register User</h1>
                {error && <Message varient="danger" message={error}/> }
                  {loading && <Loader/>}
                {message&& <Message varient="danger" message={message}/>}
                <Form onSubmit={submitHandler}>
                     <Form.Group controlId={name}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="name"
                            placeholder="Pleae enter Name"
                            value={name}
                            required
                            onChange={(e)=>setName(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId={email}>
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="Pleae enter email"
                            value={email}
                            required
                            onChange={(e)=>setEmail(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId={password}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Pleae enter password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId={comfirmpassword}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Pleae enter password"
                            value={comfirmpassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                        <Button type="submit" variant="info">Register</Button>
                        <Row className="py-3">
                
                </Row>
                </Form>
                     <Col>
                        Existing Customer?{' '}
                        <Link to='/User'>
                        Sign In
                        </Link>
                    </Col>
               </FormComponent>
        </>
    )
}

export default RegisterScreen
