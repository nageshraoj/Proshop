import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from "react-redux"
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {userLogout} from "../actions/userActions"

const Header = () => {

 const dispatch = useDispatch()
  const userStatus = useSelector(state=>state.userLogin)
  const getItems = useSelector(state=>state.cartList)
  const {cartItems} = getItems;

  const {userInfo} = userStatus


    const logOutHandeler = () =>{
        dispatch(userLogout)
    }

    return (
        <header>
         <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
             <Container>
                 <LinkContainer to="/">
                     <Navbar.Brand>NextShop</Navbar.Brand>
                 </LinkContainer>
             
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <LinkContainer to="/Cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>
                              {cartItems && cartItems.length ? cartItems.reduce((acc,item)=> acc + item.qty,0):null}  Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo?  <>
                             <NavDropdown title={userInfo.name}>
                                <LinkContainer to={`/profile`}>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logOutHandeler}>Sign Out</NavDropdown.Item>
                            </NavDropdown> </>  :
                        
                            <LinkContainer to="/User">
                            <Nav.Link>
                                <i className="fas fa-user"></i>
                                <span>Sign In</span>
                            </Nav.Link>
                          </LinkContainer>
                         } 


                       

                        </Nav>
                    </Navbar.Collapse>
             </Container>
           
            </Navbar>  
        </header>
    )
}

export default Header
