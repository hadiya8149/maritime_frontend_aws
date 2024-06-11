import {useEffect, useState} from 'react'

import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { API_URL } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs';
import 'react-toastify/dist/ReactToastify.css';

export default function CourseInfo(){
  const [course, setCourse]=useState()
  const{id}=useParams();
  const token = localStorage.getItem('authToken')
  async function getCourseInfo(){
    const response = await axios.get(`${API_URL}/course/`+id)
    console.log(response.data.data)
    setCourse(response.data.data)
  }
  const stdID = localStorage.getItem('std_id')
  async function createProgress(progress_data){
    let data = qs.stringify({
      'std_id': stdID,
      'courseID': progress_data.course_id,
      'programID': 'null',
      'ProgressPercentage': 100,
      'CompletionStatus': 'Completed',
      'LastUpdatedDate':  new Date().toISOString().slice(0,19).replace('T', ' ')
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/progress`,
      headers: {
        "authentication": `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      if(response.status===200){
        toast.success("Congratulations you have completed the course")
      }
    })
    .catch((error) => {
      console.log(error);
    });
    
  }
  useEffect(()=>{
    console.log(id)
    getCourseInfo()
  }, [])
    return(      
        <div className="container " style={{marginTop:'10%'}}>
          <div className="">
            {course && course.map((courseDetail)=>{
              return(
                <div key={courseDetail.course_id}>
<h3>{courseDetail.course_name}</h3>

<p>{courseDetail.description}</p>
  <h4>Instructor: {courseDetail.instructor}</h4>

{/* <h4>
    What you'll learn
</h4>
<ul>
    <li>Handfl</li>
    <li>Handfl</li>
    <li>Handfl</li>
    <li>Handfl</li>

</ul> */}

<h5>System Requirements</h5>
<ul className='text-left'>
  <li>Internet access - users will need a device with a web browser and internet connection
  </li>
  <li>
  System - runs on computers, tablets and mobile devices using Windows 7 and above and MAC OS devices running IOS 11 and above

  </li>
  <li>
  Browsers - Edge, Chrome, Firefox and Safari
  </li>
  <li>
  Minimum browser size - none
  </li>
  <li>
  Audio - requires device speaker or headphones

  </li>
</ul>

<div style={{marginBottom:'5%'}}>
  Course Content
  <iframe src={'http://localhost:8000/'+courseDetail.content.split(',')[0]} style={{width:"100%", height:"700px"}} >

  </iframe>
  <button onClick={(e)=>{createProgress(courseDetail)}} className='btn btn-primary'>Mark as completed</button>

  </div>
</div>
              )
            })}

</div>
<ToastContainer/>
  </div>
    )
}