import React from 'react'
import axios from 'axios'
import '../css/students.css'
import { useEffect} from 'react'
import courseIllustration from '../assets/img/illustrations/course_illustration.jpg'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils.js';

export default function StudentPortal(){
    const navigate=useNavigate();
    const user_id = localStorage.getItem('user_id');
    const user_role = localStorage.getItem('role');
    useEffect(()=>{
      
            if(user_role && user_role.toLowerCase()==='student'){
                fetchStdID();

            }
            else{
                alert("Please login as a student to gain access")
                navigate('/')
            }
        
        
    })
    async function  fetchStdID(){
        const response = await  axios.get(`${API_URL}/student_by_user_id/`+user_id);
        console.log(response)
        if (response.status === 200) {
            console.log(response.data.data.user_id)
            localStorage.setItem('std_id', response.data.data.std_id)
        }
    }
    return (
        
        <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{marginTop:'5%'}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="/student">Home</a>
        </li>
     
        <li className="nav-item">
          <a className="nav-link" href="/my_course&programs">My Courses and Programs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile">Profile</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      <div className='container m-auto h-100 '>
        <h2>
            Welcome to Maritime student Portal
        </h2>
        <p>
        The Maritime Education System  is a web-based platform designed to provide a 
comprehensive resource for maritime education  within the maritime industry.  
        </p>
        <div className='text-left d-flex' style={{marginTop:'25px'}}>
            <div style={{width:'50%', marginTop:'10%'}}>
        <h4>What you can do through the Maritime Student Portal</h4>
        <ul style={{listStyleType:'square'}}>
            <li>Search various courses & programs</li>
            <li>Track progress of courses</li>
            <li>Equip yourself with knowledge and gain hands-on-skills</li> 
        </ul>
        <p>
        Enhance your career with a globally recognised Diploma or short course, view our courses  to find one that’s right for you!


        </p>
        </div>
        <div >
          <img src={courseIllustration}></img>
        </div>
        
        </div>
              </div>

      </>
    )
}