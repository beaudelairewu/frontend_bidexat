import React from 'react'
import {Link} from 'react-router-dom'

export default function Landing() {

    return (
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
            <div className="container" >
                <div className="row" >
                    <div className="col-12 text-center">
                            <h1>👉 Sorry, we are currently under development👈</h1>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-12 text-center">
                        <p>For non-public user go to Dashboard.</p>
                        <Link to="/dashboard">
                            <button className="btn btn-success">Go to Dashboard</button>       
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
