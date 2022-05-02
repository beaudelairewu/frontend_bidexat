import React, { useState, useEffect } from 'react';
import AddImage from './AddImage';
import ImageGrid from './ImageGrid';
import SlideSetting from './SlideSetting';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'
import {useAuth} from '../contexts/AuthContext'


export default function Slide() {
  const params = useParams()
  const [slideInfo, setSlideInfo] = useState([])
  const headText = {fontWeight:"bold", color:"green"}
  const {currentUser, imageData, setImageData} = useAuth()
  const [unprocessedNum, setUnprocessedNum] = useState(0)

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
        data.images = imageData.length
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
            <div className='row'>
              <div className='col-6'>
                <h3>{slideInfo==undefined?"":slideInfo.name}</h3>
                <p className='mb-0'><span style={headText}>total images:</span>  {slideInfo==undefined?"":slideInfo.images}</p>
                <p className='mb-0'><span style={headText}>detected ov eggs:</span>  {slideInfo==undefined?"":slideInfo.ovEggs}</p>
                <p className='mb-0'><span style={headText}>date created:</span>  {slideInfo==undefined?"":slideInfo.created}</p>
                <p className='mb-0'><span style={headText}>description:</span>  {slideInfo==undefined?"":slideInfo.description}</p>
              </div>
              <div className='col-6'>
              <p className='mb-0'><span style={headText}>unprocessed images:</span>  {slideInfo==undefined?"":slideInfo.images}</p>
              </div>
            </div>
          </div>
        </div>
      <div className='row'>
        <div className='col-6 mt-2'>
        </div>
        <div className='col-6 mt-2'>
          <AddImage/>
          <SlideSetting/>
        </div>
      </div>
      </div>
      <ImageGrid/>
  </div>;
}
