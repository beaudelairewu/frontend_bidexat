import Gallery from 'react-grid-gallery';
import React, {useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import {db, storage} from '../firebase'
import { useAuth } from '../contexts/AuthContext'

export default function ImageGrid() {

    const params = useParams()
    const {currentUser} = useAuth()
    const [tdata, setTdata] = useState([])

    async function getImages(){
        db.firestore.collection('users').doc(currentUser.email)
        .collection('patients').doc(params.patientID)
        .collection('slides').doc(params.slideID)
        .collection('images')
        .where("deleted", "==", false)
        // .where("processed","==", true)
        .onSnapshot((querySnapshot) => {
            setTdata([])
            querySnapshot.forEach((doc) => { 
                const data = doc.data()
                // console.log(data)
                let dat = {
                    id: doc.id,
                    name: data.name, 
                    created:'', 
                    processed: data.processed,
                    ovCount: data.ovCount,
                    src: '',
                    thumbnail:'',
                    thumbnailWidth:20,
                    thumbnailHeight:10
                }
                // let date =  data.created.toDate().toString().split(' ')
                // dat.created = `${date[1]} ${date[2]}, ${date[3]}`
                storage.ref().child(`input/${currentUser.email}/${params.patientID}/${params.slideID}/${data.name}`)
                .getDownloadURL()
                .then((url)=>{
                    dat.src = url
                    dat.thumbnail = url
                })
                setTdata(prevState => [...prevState, dat])
            });
        });
    }

    useEffect(()=>{
        getImages()
      },[]);

  return (
    <div className='container'>
        <Gallery images={tdata}/>
    </div>
  )
}