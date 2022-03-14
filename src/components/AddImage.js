import React, {useState, useEffect}from 'react';
import {Modal, Form, Button} from "react-bootstrap"

export default function AddImage() {
    const [modalState, setModalState] = useState(false)
    const [chunkFile, setchunkFile] = useState([])
    const [actualFiles, setActualFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState([])

    
    function openModal(){
        setModalState(true)
    }

    function closeModal(){
        setModalState(false)
    }

    function splitToChunks(items, size) {
        const a = []
        const result = new Array(Math.ceil(items.length / size)).fill().map(_ => items.splice(0, size))
        a.push(result)
        setchunkFile(a)
    }

    async function handleSubmit(e){
        e.preventDefault()
        
        closeModal()
    }
    function fileChange(e){
        console.log(e.target.files)
        setActualFiles([])
        // setSelectedFile([])
        setchunkFile([])
        const files = e.target.files
        for(let i=0; i<files.length;i++){
            setSelectedFile(prevState => [...prevState, files[i].name])
        }
        setActualFiles(files)
        console.log(selectedFile)

        const a = []
        const size = 12
        const items = selectedFile
        const result = new Array(Math.ceil(items.length / size)).fill().map(_ => items.splice(0, size))
        a.push(result)
        setchunkFile(a)
        console.log(chunkFile)
    }

    // useEffect(()=>{
    //     if(selectedFile != []){
    //     splitToChunks(selectedFile, 12)
    //     }
    // },[selectedFile])

    return <div>
      <div className="container">
                <div className="row">
                     <div className="col-6">
                     {/* <h2 className="py-1">Dashboard</h2> */}
                     </div>
                    <div className="col-6">
                        <button className="btn btn-outline-success my-1 float-end" onClick={openModal}>Add New Samples</button>
                            <Modal show={modalState} onHide={closeModal}>
                                <Form onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <Form.Group>
                                        <Form.Label>Input Files</Form.Label>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            // webkitdirectory="true"
                                            required
                                            onChange={fileChange}
                                            accept="images/*"
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
                </div>
            </div>
  </div>;
}
