import React, {useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap"
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router'


export default function AddPatient() {

    const [modalState, setModalState] = useState(false)
    const [clusterTag, setClusterTag] = useState("")
    const [description, setDescription] = useState('')
    const {currentUser} = useAuth()
    const [errStatus, setErrStatus] = useState('')
    const history = useHistory()

    function openModal(){
        setModalState(true)
    }
    function closeModal(){
        setModalState(false)
    }
    function handleSubmit(e){
        e.preventDefault()

        try{
            db.firestore.collection('users').doc(currentUser.email).collection('patients').add({
                name: clusterTag,
                description: description,
                created: new Date(),
                modified: new Date(),
                images: 0,
                ovEggs: 0,
                ownership: `${currentUser.email}`,
                deleted:false
            })
        }catch(e){
            setErrStatus(`${e}`)
        }

        setClusterTag("")
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
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={clusterTag}
                                            onChange={e => setClusterTag(e.target.value)}
                                        />
                                        </Form.Group>
                                        <Form.Group>
                                        <Form.Label>Patient ID</Form.Label>
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
                                        Add Collection
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                    </div>
                // </div>

    )
}
