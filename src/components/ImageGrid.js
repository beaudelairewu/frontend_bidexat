import Gallery from 'react-grid-gallery';
import React, {useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import {db, storage} from '../firebase'
import {useAuth} from '../contexts/AuthContext'

export default function ImageGrid() {

    const params = useParams()
    const {currentUser, imageData, setImageData} = useAuth()
    // const [ImageData, setImageData] = useState([])

    async function getImages(){
        db.firestore.collection('users').doc(currentUser.email)
        .collection('patients').doc(params.patientID)
        .collection('slides').doc(params.slideID)
        .collection('images')
        .where("deleted", "==", false)
        .where("computed","==", true)
        .onSnapshot((querySnapshot) => {
            setImageData([])
            querySnapshot.forEach((doc) => { 
                const data = doc.data()
                // console.log(data)
                let dat = {
                    // id: doc.id,
                    // name: data.name, 
                    // created:'', 
                    // processed: data.processed,
                    // ovCount: data.ovCount,
                    src: '',
                    thumbnail:'',
                    thumbnailWidth:20,
                    thumbnailHeight:10, 
                    caption: `${data.name}  OV Count: ${data.ovCount}`
                }
                // let date =  data.created.toDate().toString().split(' ')
                // dat.created = `${date[1]} ${date[2]}, ${date[3]}`
                storage.ref().child(`output/${currentUser.email}/${params.patientID}/${params.slideID}/${data.name}`)
                .getDownloadURL()
                .then((url)=>{
                    dat.src = url
                    dat.thumbnail = url
                })
                setImageData(prevState => [...prevState, dat])
            });
        });
    }

    useEffect(()=>{
        getImages()
      },[]);

  return (
    <div className='container'>
        <Gallery images={imageData}/>
    </div>
  )
}
