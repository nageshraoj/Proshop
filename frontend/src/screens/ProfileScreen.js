import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {getUserDetils,updateUserDetils} from "../actions/userActions"
import {Form,Button,Row,Col} from "react-bootstrap"
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({id,history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [comfirmpassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch =useDispatch()
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
  
    const userDetails = useSelector(state=>state.userDetails)
    const {user,loading,error} = userDetails

    const userUpdate = useSelector(state=>state.userUpdate)
    const {sucess} = userUpdate

    // const redirect = location.search ? location.search.split('=')[1]:'/'

    useEffect(()=>{
        console.log(userInfo)
        if(!userInfo) {
            history.push('/User')
        } else{
            if(!user.name){
                dispatch(getUserDetils('Profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        
    },[userInfo,dispatch,history,user])

    const submitHandler =(e) =>{
        e.preventDefault()
        if(password!==comfirmpassword){
            setMessage('Password mismatch')
    }
    else{
    dispatch(updateUserDetils({id:user._id,
        name,
        email,
        password
        }))
        }
    }

    return (
        <>
             <Row>
                <Col md={6}>
               <h1>Update Profile</h1>
                {error && <Message varient="danger" message={error}/> }
                  {loading && <Loader/>}
                {message&& <Message varient="danger" message={message}/>}
                {sucess && <Message varient="success" message="Updated successfull"/>}
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

                        <Button type="submit" variant="info">Update</Button>
                        <Row className="py-3">
                
                </Row>
                </Form>
                </Col>
                <Col md={2}>
                    Cart Items
                </Col>
               </Row>
        </>
    )
}

export default ProfileScreen
