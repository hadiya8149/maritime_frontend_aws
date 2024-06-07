import msg_icon from '../assets/icons8-message-50.png'
import { useState, useEffect } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function JobSeekerPortal() {
    const navigate=useNavigate()
    const [notifications, setNotifications]=useState([])
    const role = localStorage.getItem('role')
    useEffect(() => {
      if (role){
        if (role.toLowerCase()==='job seeker'){
          fetchData();
         }
     else{
       navigate('/')
     }
      }
      else{
        navigate('/')
      }
     
    }, []);
    const jobSeeker_id = localStorage.getItem('jobSeeker_id');
    const user_id = localStorage.getItem('user_id')
    const [appliedJobs, setAppliedJobs] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/applied_jobs_by_user/' + jobSeeker_id);
            if (response.status === 200) {
                // Update state immediately
                setAppliedJobs(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function getNotifications(){
        const response = await axios.get("http://localhost:8000/api/notification_by_user_id/"+user_id)
        console.log(response)
        setNotifications(response.data)
    }
    useEffect(()=>{
        getNotifications();
    },[])
    return (
        <div >
  
            <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ marginTop: "5%" }}>
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                                <a class="nav-link " aria-current="page" href="/jobseeker">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" target="_blank" href="/jobs">View jobs</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style={{ border: 'None', background: 'white'}} href='/applied_jobs'>My Applications</a>
                            </li>
                            <div className="dropdown">
                                <a className="nav-link fw-medium dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Notifications
                                </a>
                                <ul className="dropdown-menu notifications">
                                {notifications.length === 0 ? (
      <li className="">No notifications</li>
    ) : (
      notifications.map((notification) => (
        <li key={notification.notification_id} >
          {notification.content} {/* Assuming notifications have a title property */}
          <hr/>
        </li>
      ))
    )}
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
                            <li class="nav-item">
                                <a class="nav-link" href='/jobseeker_profile' role='button'>Profile</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div className='container m-auto '>
                <h2>
                    Welcome to Maritime Job Seeker Portal
                </h2>
                <div style={{textAlign:'left', marginTop:'10%', marginBottom:'10%'}}>
                <h4>
                    What you can do throught the Maritime Job seeker Portal
                </h4>
                <ul style={{listStyleType:'square'}}>
                    <li>Save your resume for easy apply</li>
                    <li>Get a chance to work with top maritime companies</li>
<li>Interview facilitation</li>
<li>Message with Recruitment team to follow up</li>
<li>Get notified about job activities</li>
                </ul>
                </div>

            </div>

        </div>
    )
}