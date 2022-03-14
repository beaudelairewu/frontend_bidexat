import React from 'react';
import AddPatient from './AddPatient';
import PatientsTable from './PatientsTable'

export default function DashBoard() {
  return <div>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className='text-left'>Dashboard</h1>
                </div>
            </div>
            <div className='card shadow-sm rounded border-success'>
                <div className='card-body'>
                    <div className='card-title'>
                        <h2 className='text-success'>Patients</h2>
                    </div>
                    <div className='row'>
                        <div className='col-10'>
                            <div class="input-group mx-0">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <button type="button" className="btn btn-outline-success">search</button>
                            </div>
                        </div>
                        <div className='col-2 mx-0'>
                            <AddPatient/>
                        </div>
                    </div>
                    <PatientsTable/>
                </div>
            </div>
            

            

        </div>
    </div>

}
