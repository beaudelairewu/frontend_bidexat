import React, {useState, useEffect} from 'react';
import {useHistory, useParams, useLocation} from 'react-router-dom'
import { db } from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'
import SlidesTable from '../SlidesTable';
import EditPatientInfo from './EditPatientInfo';



    export default function Patient() {
        const [patientInfo, setPatientInfo] = useState([])
        const { currentUser} = useAuth()
        const location = useLocation()
        const params = useParams()
        const patientID = params.patientID
        const headText = {fontWeight:"bold", color:"green"}
        const history = useHistory()

        
    async function getTdata(){
        setPatientInfo()
        db.firestore.collection('users').doc(currentUser.email)
        .collection('patients').doc(patientID)
        .get()
        .then((snapshot)=>{
            if (snapshot.exists){
                setPatientInfo()
                const data = snapshot.data()
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
                    <div className="col-4 d-flex flex-column ">
                        <h3>{patientInfo==undefined?"":patientInfo.name}</h3>
                        <p className='mb-0'><span style={headText}>Age:</span>  {patientInfo==undefined?"":patientInfo.age}</p>
                        <p className='mb-0'><span style={headText}>Gender:</span>  {patientInfo==undefined?"":patientInfo.gender}</p>
                        <p className='mb-0'><span style={headText}>Patient ID:</span>  {patientInfo==undefined?"":patientInfo.hospitalID}</p>
                        <p className='mb-0'><span style={headText}>Note:</span>  {patientInfo==undefined?"":patientInfo.description}</p>
                    </div>
                    <div className='col-4'>
                        <EditPatientInfo/>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='row'>
            <div className='col-6'>
                <div className='card my-2'>
                    <div className='card-body'>
                    ;asldkfj
                    </div>
                </div>
            </div>
            <div className='col-6 '>
                <div className='card my-2 '>
                    <div className='card-body'>
                    ;asldkfj
                    </div>
                </div>
            </div>
        </div> */}
      <SlidesTable/>
      </div>
  </div>;
}
