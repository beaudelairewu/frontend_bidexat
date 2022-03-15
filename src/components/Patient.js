import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { db } from '../firebase'
import {useAuth} from '../contexts/AuthContext'
import SlidesTable from './SlidesTable';
import {useLocation } from 'react-router-dom'



    export default function Patient() {
        const [patientInfo, setPatientInfo] = useState([])
        const { currentUser, currentPatient, makeCurrentPatient} = useAuth()
        const location = useLocation()
        const patientID = location.pathname.split('/')[2]
        const headText = {fontWeight:"bold", color:"green"}

        
    async function getTdata(){
        setPatientInfo()
        db.firestore.collection('users').doc(currentUser.email).collection('patients').doc(patientID)
        .get()
        .then((snapshot)=>{
            setPatientInfo()
            
            const data = snapshot.data()
            console.log(data)
            setPatientInfo(data)
            
              
        }).catch((err)=>{
            console.error(err)
        })
        // console.log(patientInfo)
    }

    useEffect(()=>{
        getTdata()
        makeCurrentPatient(patientID)
        console.log(patientInfo)
        console.log(currentPatient)
    },[]);
  return <div>
      <div className='container'>
        <div className='card shadow-sm mt-4'>
            <div className='card-body'>
                <div className='row'>
                    <div className="col-4 justify-content-center text-center">
                        <img src="https://stiftung-chancenfuerkinder.de/wp-content/uploads/2020/11/blank-profile-picture-973460_1280.png"
                        width="40%" className="img-fluid rounded" alt=""/>
                    </div>
                    <div className="col-8 d-flex flex-column ">
                        <h3>{patientInfo==undefined?"":patientInfo.name}</h3>
                        <p className='mb-0'><span style={headText}>age:</span>  {patientInfo==undefined?"":patientInfo.age}</p>
                        <p className='mb-0'><span style={headText}>gender:</span>  {patientInfo==undefined?"":patientInfo.gender}</p>
                        <p className='mb-0'><span style={headText}>patient ID:</span>  {patientInfo==undefined?"":patientInfo.hospitalID}</p>
                        <p className='mb-0'><span style={headText}>Note:</span>  {patientInfo==undefined?"":patientInfo.description}</p>
                        <p className='mb-0'><span style={headText}>Note:</span>  {currentPatient==undefined?"":currentPatient}</p>
                    </div>
                </div>
            </div>
        </div>
      <SlidesTable/>
      </div>
  </div>;
}
