import React, {useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap"
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router'


export default function AddPatient() {

    const [modalState, setModalState] = useState(false)
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("")
    const [description, setDescription] = useState('')
    const [hospitalID, setHospitalID] = useState('')
    const {currentUser} = useAuth()
    const [errStatus, setErrStatus] = useState('')
    const history = useHistory()
    const headText = {fontWeight:"bold", color:"green"}

    function openModal(){
        setModalState(true)
    }
    function closeModal(){
        setModalState(false)
    }
    async function handleSubmit(e){
        e.preventDefault()

        try{
            await db.firestore.collection('users').doc(currentUser.email)
            .collection('patients')
            .add({
                name: name,
                age: age,
                gender:gender,
                hospitalID: hospitalID,
                description: description,
                created: new Date(),
                images: 0,
                ovEggs: 0,
                ownership: `${currentUser.email}`,
                deleted:false
            })
        }catch(e){
            setErrStatus(`${e}`)
        }
        
        setName("")
        setAge(0)
        setGender("")
        setHospitalID('')
        setDescription('')


        // history.go(0)
        closeModal()

    }

    return (
        <div>
                    {/* <div className="col-4"> */}
                        <button className="btn btn-outline-success float-end " onClick={openModal}>Add Patient</button>
                            <Modal show={modalState} onHide={closeModal}>
                                <Form onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <Form.Group>
                                            <Form.Label style={headText}>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                required
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label style={headText}>Age</Form.Label>
                                            <Form.Control
                                                type="number"
                                                required
                                                value={age}
                                                onChange={e => setAge(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label style={headText}>Gender</Form.Label>
                                            <Form.Select onChange={e => setGender(e.target.value)}>
                                                <option>Select Gender</option>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label style={headText}>Patient ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                required
                                                value={hospitalID}
                                                onChange={e => setHospitalID(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label style={headText}>Note</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModal}>
                                        Close
                                        </Button>
                                        <Button variant="success" type="submit">
                                        Add Patient
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                    </div>
                // </div>

    )
}
