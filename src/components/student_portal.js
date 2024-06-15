import React from 'react'
import axios from 'axios'
import '../css/students.css'
import { useEffect } from 'react'
import courseIllustration from '../assets/img/illustrations/course_illustration.jpg'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentPortal() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('role');
  const token = localStorage.getItem('authToken')
  useEffect(() => {

    if (user_role && user_role.toLowerCase() === 'student') {
      fetchStdID();

    }
    else {

      navigate('/')
    }


  })
  async function fetchStdID() {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    const headers = { Authorization: `Bearer ${token}` }
    const response = await axios.get(`${API_URL}/student_by_user_id/${user_id}`, { headers: myHeaders });
    console.log(response)
    if (response.status === 200) {
      console.log(response.data.data.user_id)
      localStorage.setItem('std_id', response.data.data.std_id)
    }
  }
  return (

    <>

      <ToastContainer />

      <div className='container m-auto ' style={{minHeight:'100vh'}}>
        <h1  className='mt-7'>
          Welcome to Maritime student Portal
        </h1>
        <p>
          The Maritime Education System  is a web-based platform designed to provide a
          comprehensive resource for maritime education  within the maritime industry.
        </p>
        <div className=' d-flex' style={{ marginTop: '25px' }}>
          <div style={{ width: '50%', marginTop: '10%' }}>
            <h4 className='text-left'>What you can do through the Maritime Student Portal</h4>
            <ul style={{padding:'16px', listStyleType: 'square', textAlign:'left', marginLeft:'50px' }}>
              <li style={{paddingLeft:'25px'}}>Search various courses & programs</li>
              <li style={{paddingLeft:'25px'}}>Track progress of courses</li>
              <li style={{paddingLeft:'25px'}}>Equip yourself with knowledge and gain hands-on-skills</li>
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