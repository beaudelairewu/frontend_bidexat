import React, {useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap"
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router'
import {useLocation, useParams} from 'react-router-dom'


export default function AddSlide() {

    const [modalState, setModalState] = useState(false)
    const [clusterTag, setClusterTag] = useState("")
    const [description, setDescription] = useState('')
    const {currentUser} = useAuth()
    const [errStatus, setErrStatus] = useState('')
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const patientID = params.patientID

    function openModal(){
        setModalState(true)
    }
    function closeModal(){
        setModalState(false)
    }
    function handleSubmit(e){
        e.preventDefault()

        try{
            db.firestore.collection('users').doc(currentUser.email).collection('patients').doc(patientID).collection('slides').add({
                name: clusterTag,
                description: description,
                created: new Date(),
                modified: "",
                images: 0,
                ovEggs: 0,
                ownership: `${currentUser.email}`,
                deleted:false
            })
        }catch(error){
            console.log(error)
            setErrStatus(`${e}`)
        }

        setClusterTag("")
        // history.go(0)
        closeModal()

    }

    return (
        <div>
                        <button className="btn btn-outline-success my-1 float-end" onClick={openModal}>Add Slide</button>
                            <Modal show={modalState} onHide={closeModal}>
                                <Form onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <Form.Group>
                                        <Form.Label>Slide ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={clusterTag}
                                            onChange={e => setClusterTag(e.target.value)}
                                        />
                                        </Form.Group>
                                        <Form.Group>
                                        <Form.Label>Description</Form.Label>
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
                                        Add Slide
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                
        </div>
    )
}
