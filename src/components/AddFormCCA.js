import React, {useState, useEffect}from 'react';
import {Modal, Form, Button} from "react-bootstrap"
import { useParams } from 'react-router-dom';
import {db, storage} from '../firebase'
import { useAuth } from '../contexts/AuthContext'

export default function AddFormCCA() {
    const [modalState, setModalState] = useState(false)
    const [files, setFiles] = useState()
    const params = useParams()
    const {currentUser} = useAuth()
    const [uploadProgress, setUploadProgress] = useState(0)
    const [detectProgress, setDetectProgress] = useState(0)
    const [fileNames, setFileNames] = useState([])
    const clusterSize = 3

    function openModal(){
        setModalState(true)
    }

    function closeModal(){
        setModalState(false)
    }
    function handleSubmit(){

    }

  return (
    <div>
         <div className="container my-2">
                <div className='row'>
                    <div className='col-6'>
                        <h3 style={{color:"green"}}>CCA-01</h3>
                    </div>
                    <div className='col-6'>
                    <button className="btn btn-outline-success my-1 float-end" onClick={openModal}>Add Slide</button>
                </div>
            </div>
        </div>
        <Modal show={modalState} onHide={closeModal}>
                                <Form onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <Form.Group>
                                        <Form.Label>Slide ID</Form.Label>
                                        {/* <Form.Control
                                            type="text"
                                            required
                                            value={clusterTag}
                                            onChange={e => setClusterTag(e.target.value)}
                                        /> */}
                                        </Form.Group>
                                        <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        {/* <Form.Control
                                            as="textarea"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        /> */}
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModal}>
                                        Close
                                        </Button>
                                        <Button variant="success" type="submit">
                                        Add Form
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
    </div>
  )
}
