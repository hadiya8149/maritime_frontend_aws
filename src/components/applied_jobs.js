import '../css/job.css';
import React from 'react'
import msg_icon from '../assets/icons8-message-50.png'
import '../css/jobseeker.css'
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios'
import { API_URL } from '../utils';
import { useNavigate } from 'react-router-dom';
export default function AppliedJobs() {
  const token = localStorage.getItem('authToken')
  const navigate = useNavigate()
  
  const user_id= localStorage.getItem('user_id')

    const [myJobs, setmyJobs] = useState([])
    const jobSeeker_id = localStorage.getItem('jobSeeker_id')
    
  const fetchData = async () => {
    
  const myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${token}`)
      try {
          const response = await axios.get(`${API_URL}/applied_jobs_by_user/`+jobSeeker_id, {headers:myHeaders});
          if (response.status === 200) {
              setmyJobs(response.data.data);
          }
          else if (response.status===404){
            console.log(response)
          }
      } catch (error) {
          console.error(error);
      }
  };


  useEffect(() => {
      fetchData();
  },[]);
    return (
        <div style={{marginBottom:'20%'}}>

        <div className='container' style={{marginBottom:'100px', marginTop:'100px', marginLeft:'auto', marginRight:'auto', padding:'10px'}}>

            <h3>Applied jobs</h3>
            <table className="table w-75" style={{marginBottom:'5%', marginLeft:'auto', marginRight:'auto'}}>
  <thead style={{fontWeight:'bold'}}>
    <tr>
      <th scope="col">Application Id</th>
      <th scope="col">Job Title</th>
      <th scope="col">Application Date</th>
      <th></th>

    </tr>
  </thead>
  <tbody>
    {myJobs.length===0?<p className='text-center'>Not applied to any jobs yet</p>:myJobs.map((myJob)=>{
      return(
        <tr>
      <td>{myJob.app_id}</td>
      <td>{myJob.job_title}</td>
      <td>{myJob.AppDate && myJob.AppDate.toLocaleString().slice(0,19).replace('T', ' ')}</td>
    
    </tr>
    
      )
    })}
  </tbody>
</table>



           




</div>
</div>
            )
}