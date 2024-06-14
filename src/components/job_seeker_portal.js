import msg_icon from '../assets/icons8-message-50.png'
import { useState, useEffect } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NotificationsIcon from '@mui/icons-material/Notifications';

import { API_URL } from '../utils';
import '../css/jobseeker.css'
export default function JobSeekerPortal() {
    const navigate=useNavigate()
    const token = localStorage.getItem('authToken')
    const [notifications, setNotifications]=useState([])
    const role = localStorage.getItem('role')
    const user_id = localStorage.getItem('user_id')
    async function getJobSeekerID(){
        const response = await axios.get(`${API_URL}/jobseeker_by_user_id/${user_id}`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}})
        if(response.status===200){
            localStorage.setItem("jobSeeker_id",response.data.data.jobSeeker_id)
        }
    }
    useEffect(() => {
      if (role){
        if (role.toLowerCase()==='job seeker'){
           getJobSeekerID()
         }
     else{
       navigate('/')
     }
      }
      else{
        navigate('/')
      }
     
    }, []);
    
return (
        <div  className='jobseeker-portal-div'>
  
          
            <div className='container m-auto  '>
                <h2 className='mt-10'>
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