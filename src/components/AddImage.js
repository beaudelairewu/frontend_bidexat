import React, {useState, useEffect}from 'react';
import {Modal, Form, Button} from "react-bootstrap"
import { useParams } from 'react-router-dom';
import {db, storage} from '../firebase'
import { useAuth } from '../contexts/AuthContext'

export default function AddImage() {
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

    function fileChange(e){
        const cfiles = e.target.files
        setFiles()
        setFileNames([])
        setFiles(cfiles)
        for(let i=0;i<cfiles.length;i++){
            setFileNames((prevState)=>[...prevState, cfiles[i].name])
        }
        console.log(fileNames)
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        setUploadProgress(0)
        setDetectProgress(0)
        closeModal()
        for(let i=0;i<files.length;i++){
            storage.ref().child(`input/${currentUser.email}/${params.patientID}/${params.slideID}/${files[i].name}`).put(files[i])
            try{
                await db.firestore.collection('users').doc(currentUser.email)
                .collection('patients').doc(params.patientID)
                .collection('slides').doc(params.slideID)
                .collection('images').doc(files[i].name)
                .set({
                    name: files[i].name,
                    deleted: false,
                    processed: false,
                    ovCount: 0,
                    created: new Date(),
                })
            }catch(e){
                console.log(e)
            }
            let prog = ((i+1)*100)/files.length
            setUploadProgress(prog)
        }
        
        setDetectProgress(33)
        for (let i = 0; i < files.length; i += clusterSize) {
            const chunk = fileNames.slice(i, i + clusterSize);
            const formDat = new FormData
            formDat.append('userID', currentUser.email)
            formDat.append('patientID', params.patientID)
            formDat.append('slideID', params.slideID)
            formDat.append('image_name_list', chunk)
            const response = await fetch('https://api.bidex.health/detectov', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials:'omit',
                body: formDat
            })
            console.log(response.json())
        }
        setDetectProgress(36)
        
    }

    
    return <div>
      <div >
                        <button className="btn btn-outline-success mt-1 mb-2 float-end" onClick={openModal}>Add New Samples</button>
                            <Modal show={modalState} onHide={closeModal}>
                                <Form onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <Form.Group>
                                        <Form.Label>Input Files</Form.Label>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            required
                                            onChange={fileChange}
                                            accept="image/*"
                                        />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModal}>
                                        Close
                                        </Button>
                                        <Button variant="success" type="submit">
                                        Add New Samples
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                       
                
                {uploadProgress==0?"": 
                <div className='row'>
                    <div className='col-6'><p className='text-end'>upload images to cloud storage</p></div>
                    <div className='col-6 mt-2'>
                        <div class="progress">
                            <div class="progress-bar bg-success" role="progressbar"  aria-valuenow={uploadProgress} style={{width:`${uploadProgress}%`}} aria-valuemin="0" aria-valuemax="100">{uploadProgress}%</div>
                        </div>
                    </div> 
                </div>}
                {detectProgress==0?"":
                <div className='row'>
                    <div className='col-6'><p className='text-end'>AI run detection</p></div>
                    <div className='col-6 mt-2'>
                        <div class="progress">
                            <div class="progress-bar bg-success" role="progressbar"  aria-valuenow={detectProgress} style={{width:`${detectProgress}%`}} aria-valuemin="0" aria-valuemax="100">{detectProgress}%</div>
                        </div>
                    </div>
                </div>
                }
            </div>
  </div>;
}
