import React, {useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap"
import { useParams } from 'react-router-dom';
import {db, storage} from '../firebase'
import { useAuth } from '../contexts/AuthContext'

export default function SlideSetting() {
    const [modalState, setModalState] = useState(false)
    const params = useParams()
    const {currentUser} = useAuth()

    function openModal(){
        setModalState(true)
    }

    function closeModal(){
        setModalState(false)
    }
    function downloadProcessed(){

    }

  return (
    <div >
        <button className="btn btn-outline-secondary mt-1 mb-2 mx-2 float-end" onClick={openModal}>Options</button>
        <Modal show={modalState} onHide={closeModal}>
                <Modal.Body>
                    <div className='row my-1'>
                        <div className='col-8'>
                            <Button variant="outline-dark" onClick={downloadProcessed}>
                                Send Unprocessed to Server
                            </Button>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className='col-8'>
                            <Button variant="outline-success" onClick={downloadProcessed}>
                                Download Processed Images
                            </Button>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className='col-8'>
                            <Button variant="danger" onClick={downloadProcessed}>
                                Delete Slide
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                    Close
                    </Button>
                </Modal.Footer>
        </Modal>
    </div>
    
  )
}
