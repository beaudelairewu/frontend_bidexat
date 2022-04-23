import React, { useState, useEffect } from 'react';
import AddImage from './AddImage';
import ImageGrid from './ImageGrid';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'
import {useAuth} from '../contexts/AuthContext'

export default function Slide() {
  const params = useParams()
  const [slideInfo, setSlideInfo] = useState([])
  const headText = {fontWeight:"bold", color:"green"}
  const {currentUser} = useAuth()

  function getTdata(){
    setSlideInfo()
    db.firestore.collection('users').doc(currentUser.email)
    .collection('patients').doc(params.patientID)
    .collection('slides').doc(params.slideID)
    .get()
    .then((snapshot)=>{
      if (snapshot.exists){
        setSlideInfo()
        const data = snapshot.data()
        let date =  data.created.toDate().toString().split(' ')
        data.created = `${date[1]} ${date[2]}, ${date[3]}`
        setSlideInfo(data)
      }else{
        console.log('no doc')
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
        <div className='card mt-4'>
          <div className='card-body'>
            <h3>{slideInfo==undefined?"":slideInfo.name}</h3>
            <p className='mb-0'><span style={headText}>images:</span>  {slideInfo==undefined?"":slideInfo.images}</p>
            <p className='mb-0'><span style={headText}>ov eggs:</span>  {slideInfo==undefined?"":slideInfo.ovEggs}</p>
            <p className='mb-0'><span style={headText}>date created:</span>  {slideInfo==undefined?"":slideInfo.created}</p>
            <p className='mb-0'><span style={headText}>description:</span>  {slideInfo==undefined?"":slideInfo.description}</p>
          </div>
        </div>
      </div>
      <AddImage/>
      <ImageGrid/>
  </div>;
}
