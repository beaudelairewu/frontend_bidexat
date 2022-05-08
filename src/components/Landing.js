import React from 'react'
import {Link} from 'react-router-dom'
import styles from './css/Landing.module.css'

export default function Landing() {

    return (
        <div>
            <div className={styles.page}>
                <div className={styles.card}>
                <div className={styles.container}>
                    <div className={styles.meny}>
                    <h3></h3>
                    <i className="fas fa-bars"></i>
                    </div>
                    <div className={styles.content}>
                    <div className={styles.text}>
                        <div className={styles.logo}></div>
                        <h1>The Opisthorchis viverrini<br/>assessment tool.</h1>
                        <p>For quick assessment of Opisthorchis Viverrini <br/> infections.</p>
                        <a href="/login">Log In</a>
                    </div>  
                    </div>
                </div>
                <div className={styles.photo}></div>
                </div>
            </div>
        </div>
    )
}
