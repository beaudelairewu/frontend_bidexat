import React, {useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { login, currentUser} = useAuth()
    const history = useHistory()


    async function handleSubmit(e){
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
            
        } catch (err) {
            setError("Failed to Login")
        }

        setLoading(false)

    }

    useEffect(()=>{
        if (currentUser != null){
            history.push('/dashboard')
        }
    },[]);

    return (
            <div className="Login">
                <Container className="d-flex align-items-center justify-content-center" 
                style={{minHeight:"100vh"}}>
                    <div className="w-100" style={{maxWidth: "400px"}}>
                            {error && <Alert variant="danger">{error}</Alert>}
                        <Card>
                            <Card.Body>
                            <br></br>
                            <h2 className="text-center mb-4" style={{color:"#008000"}}>Login</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label style={{float:"left"}}>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label style={{float:"left"}}>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <br></br>
                                <Button disabled={loading} className="w-100 btn-success" type="submit">
                                Log In
                                </Button>
                                <br></br><br></br>
                            </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            {/* Don't have an account? <Link to="/signup" style={{color:'#008000'}}>Sign Up</Link> */}
                        </div>
                    </div>
                </Container>
            </div>
    )
}