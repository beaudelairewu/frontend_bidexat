import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { db } from '../firebase'
import {useAuth} from '../contexts/AuthContext'
import SlidesTable from './SlidesTable';
import {useLocation } from 'react-router-dom'



    export default function Patient() {
        const [patientInfo, setPatientInfo] = useState()
        const { currentUser} = useAuth()
        const location = useLocation()
        const patientID = location.pathname.split('/')[2]

        
    async function getTdata(){
        setPatientInfo()
        db.firestore.collection('users').doc(currentUser.email).collection('patients').doc(patientID)
        .get()
        .then((snapshot)=>{
            // const data = {
            //     name: snapshot.data().name,
            //     patientID: patientID,
            //     age: snapshot.data().age,
            //     sex:snapshot.data().sex,
            //     description: snapshot.data().description,
            //     created: snapshot.data().created,
            //     modified: snapshot.data().modified
            // }
            const data = snapshot.data().name
            setPatientInfo(data)
            
              
        }).catch((err)=>{
            console.error(err)
        })
        // console.log(patientInfo)
    }

    useEffect(()=>{
        getTdata()
        console.log(patientInfo)
    },[]);
  return <div>
      <div className='container'>
        <div className='card'>
            {/* <h2>{patientInfo.name}</h2> */}
        </div>
      <SlidesTable/>
      </div>
  </div>;
}
