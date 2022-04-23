import React, { useState } from 'react'
// import logo from './assets/logo_160x43.png'
import {useAuth} from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import { NavDropdown, Nav, Navbar, Container, Image} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faAddressCard } from "@fortawesome/free-solid-svg-icons"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"


export default function Navigation() {

    const history = useHistory()
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState("")

    function goToLogin(){
        history.push('/login')
    }

    async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/login")
        } catch (err){
          setError("Failed to log out")
        }
      }

    return (
        <div className="NavbarComponent">
            <Navbar bg="white" expand="sm" className="shadow-sm">
            <Container fluid>
              <Navbar.Brand href="/">Bidex
                {/* <Image width="105" src={logo}></Image> */}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/">Research</Nav.Link>
                  <Nav.Link href="/">Docs</Nav.Link>
                  <Nav.Link href="/">About</Nav.Link>
                </Nav>
                <Nav>

                    {(currentUser == null) 
                    ? 
                      <button className="btn btn-outline-success btn-sm" onClick={goToLogin} >Log In</button>
                    :  
                  <NavDropdown title="Navigate" id="basic-nav-dropdown" alignRight flip="true" style={{left:"auto"}}>
                    <NavDropdown.Item className="text-truncate" >{(currentUser && currentUser.email)}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item href="/">Setting</NavDropdown.Item>
                    <NavDropdown.Item href="/">Get Help</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout} style={{color:'red'}}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                    }
                  <Nav.Link > <FontAwesomeIcon icon={faAddressCard} /></Nav.Link>
                  <Nav.Link > <FontAwesomeIcon icon={faQuestionCircle} /></Nav.Link>
                  <Nav.Link> <FontAwesomeIcon icon={faBell} /></Nav.Link>
                    
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
    )
}
