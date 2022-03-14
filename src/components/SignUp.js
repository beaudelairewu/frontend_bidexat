import React, {useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { signup} = useAuth()
    const history = useHistory()


    async function handleSubmit(e){
        //create user
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
          }
        if (passwordRef.current.value.length < 8){
            return setError("Passwords must be at least 8 character")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            
        } catch (err){
            setError("Failed to create an account")
        }
        //save user's data in firestore
        db.firestore.collection('users').doc(emailRef.current.value)
        .set({
        email: emailRef.current.value
        })
        .then(()=>{
        console.log("saved data")
        history.push('clustertable')
        })
        .catch((err)=>{
        console.log(err)
        })
        
        setLoading(false)

        

    }

    return (
            <div className="Signup">

                <Container className="d-flex align-items-center justify-content-center" 
                style={{minHeight:"100vh"}}>
                    <div className="w-100" style={{maxWidth: "400px"}}>
                        <Card>
                            <Card.Body>
                            <h2 className="text-center mb-4" style={{color:"#008000"}}>Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                <Form.Label style={{float:"left"}}>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required disabled={loading}/>
                                </Form.Group>
                                <Form.Group id="password">
                                <Form.Label style={{float:"left"}}>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required disabled={loading}/>
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                <Form.Label style={{float:"left"}}>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required disabled={loading}/>
                                </Form.Group>
                                <br></br>
                                <Button disabled={loading} className="w-100 btn-success" type="submit">
                                Sign Up
                                </Button>
                            </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Already have an account? <Link to="/login" style={{color:'#008000'}}>Log In</Link>
                        </div>
                    </div>
                </Container>
            </div>
    )
}
