import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import AddSlide from './AddSlide'
import { db } from '../firebase'
import {useAuth} from '../contexts/AuthContext'
import {useLocation } from 'react-router-dom'

export default function SlidesTable() {

    const [tdata, setTdata] = useState([])
    const { currentUser} = useAuth()
    const location = useLocation()
    const params = useParams()

    function getTdata(){
        db.firestore.collection('users').doc(currentUser.email)
        .collection('patients').doc(params.patientID)
        .collection("slides")
        .where("deleted", "==", false)
        .onSnapshot((querySnapshot) => {
            setTdata([])
            querySnapshot.forEach((doc) => { 
                let dat = {
                    id:'',
                    name:'', 
                    created:'', 
                    modified:'', 
                    images:'', 
                    ovEggs:''
                }
                dat.id = doc.id
                dat.name = doc.data().name;
                let date =  doc.data().created.toDate().toString().split(' ')
                dat.created = `${date[1]} ${date[2]}, ${date[3]}`
            
                if(doc.data().modified != (null || "")){
                    dat.modified = `${date[1]} ${date[2]}, ${date[3]}`
                }else{
                    dat.modified = "-"
                }
                dat.images = doc.data().images
                dat.ovEggs = doc.data().ovEggs
                setTdata(prevState => [...prevState, dat])
                // console.log(tdata)
            });
        });
    }

    useEffect(()=>{
        getTdata()
    },[]);

    return (
        <div>
            <div className="ClusterList mt-3">
                <div className="container">
                    <div className='row'>
                        <div className='col-6'>
                            <h3 style={{color:"green"}}>Slides</h3>
                        </div>
                        <div className='col-6'>
                            <AddSlide />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <br></br>
                            <div className="table-responsive" >
                                <table className="table align-middle table-hover" >
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Created</th>
                                        <th scope="col">Modified</th>
                                        <th scope="col">Images</th>
                                        <th scope="col">Ov Eggs</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {tdata.map((data, i) => 
                                        <tr key={data.id}>
                                            <th scope="row">{i+1}</th>
                                            <th scope="row" >
                                                <Link to={`/patient/${params.patientID}/slide/${data.id}`} style={{color:'#008000'}}>{data.name}</Link>
                                            </th>
                                            <td >{data.created}</td>
                                            <td >{data.modified}</td>
                                            <td >{data.images}</td>
                                            <td >{data.ovEggs}</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
