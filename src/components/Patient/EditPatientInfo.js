import React, {useState, useEffect} from 'react';
import {useHistory, useParams, useLocation} from 'react-router-dom'
import { db } from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'
import {Modal, Form, Button, Dropdown, DropdownButton} from "react-bootstrap"



export default function EditPatientInfo() {
    const history = useHistory()
    const {currentUser } = useAuth()
    const params = useParams()
    const [modalState, setModalState] = useState(false)
    const headText = {fontWeight:"bold", color:"green"}
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("")
    const [description, setDescription] = useState('')
    const [hospitalID, setHospitalID] = useState('')

    function openModal(){
        setModalState(true)
    }
    function closeModal(){
        setModalState(false)
    }

    function handleEditPatientInfo(e){
        e.preventDefault()
        db.firestore.collection('users').doc(currentUser.email)
        .collection('patients').doc(params.patientID)
        .update({
            name: name, 
            age: age,
            description: description,
            gender, gender
        }).then(()=>{console.log('update complete')})
        .catch((e)=>{console.error(e)})
        
        closeModal()
        
    }



  return (
    
        <div className='float-end'>
            <button className='btn btn-outline-secondary btn-sm' onClick={openModal}>Edit</button>
            
        
           
        <Modal show={modalState} onHide={closeModal}>
            <Modal.Body>
                <h3>Make Changes to Patient's Info</h3>
                <Button variant="outline-danger">
                    Delete Patient
                </Button>
            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="secondary" onClick={closeModal}>
                Close
                </Button>
                <Button variant="success">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

{/* <Form onSubmit={handleEditPatientInfo}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label style={headText}>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
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
                        <Form.Select onChange={e => setGender(e.target.value)} required>
                            <option>Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{fontWeight:"bold", color:"grey"}}>Patient ID.</Form.Label>
                        <Form.Control
                            type="text"
                            value={hospitalID}
                            onChange={e => setHospitalID(e.target.value)}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={headText}>Note</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                    Close
                    </Button>
                    <Button variant="success" type="submit">
                    Edit patient's info
                    </Button>
                </Modal.Footer>
            </Form> */}