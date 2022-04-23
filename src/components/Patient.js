import React, {useState, useEffect} from 'react';
import {Link, useParams, useLocation} from 'react-router-dom'
import { db } from '../firebase'
import {useAuth} from '../contexts/AuthContext'
import SlidesTable from './SlidesTable';



    export default function Patient() {
        const [patientInfo, setPatientInfo] = useState([])
        const { currentUser} = useAuth()
        const location = useLocation()
        const params = useParams()
        const patientID = params.patientID
        const headText = {fontWeight:"bold", color:"green"}

        
    async function getTdata(){
        setPatientInfo()
        db.firestore.collection('users').doc(currentUser.email)
        .collection('patients').doc(patientID)
        .get()
        .then((snapshot)=>{
            if (snapshot.exists){
                console.log(snapshot.exists)
                setPatientInfo()
                
                const data = snapshot.data()
                console.log(data)
                setPatientInfo(data)
            }else{
                console.log('nope')
            }
            
              
        }).catch((err)=>{
            console.error(err)
        })
    }

    useEffect(()=>{
        getTdata()
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
                    </div>
                </div>
            </div>
        </div>
      <SlidesTable/>
      </div>
  </div>;
}
