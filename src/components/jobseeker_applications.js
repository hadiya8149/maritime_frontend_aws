
import msg_icon from '../assets/icons8-message-50.png'
import { useState } from 'react';
import React from 'react'
import axios from 'axios'
import { API_URL } from '../utils';
export default function JobSeekerApplications(){
    const jobSeeker_id = localStorage.getItem('jobSeeker_id');
    const user_id = localStorage.getItem('user_id')
    const [appliedJobs, setAppliedJobs] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/applied_jobs_by_user/` + jobSeeker_id);
            if (response.status === 200) {
                // Update state immediately
                setAppliedJobs(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
           <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ marginTop: "5%" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/jobseeker">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" target="_blank" href="/jobs">View jobs</a>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" style={{ border: 'None', background: 'white', }} onClick={fetchData}>My Applications</button>
                            </li>
                            <div className="dropdown">
                                <a className="nav-link fw-medium dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Notifications
                                </a>
                                <ul className="dropdown-menu notifications">
                                    <li><a className="dropdown-item" href="#">Mark all as read</a></li>
                                    <li><a className="dropdown-item" href="#">Notification 1</a></li>
                                    <li><a className="dropdown-item" href="#">Notification 2</a></li>
                                </ul>
                            </div>
                            <div className="dropdown">

                                <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon} className='msg_icon'></img></a>
                                <ul className="dropdown-menu messaages">
                                    <li><a className="dropdown-item" href="#">Mark all as read</a></li>
                                    <li><a className="dropdown-item" href="#">Notification 1</a></li>
                                    <li><a className="dropdown-item" href="#">Notification 2</a></li>
                                </ul>
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" href='/jobseeker_profile' role='button'>Profile</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}