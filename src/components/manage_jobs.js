
import React from 'react'

import {useState, useEffect} from 'react';
import axios from 'axios'
import { API_URL } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageJobs(){
  const [jobs, setJobs] = useState([])
  const [jobDetails ,setJobDetails]=useState([])
  const [searchQuery, setSearchQuery]=useState('')
  const token = localStorage.getItem('authToken')
  const myHeaders = new Headers()

  useEffect(()=>{
   myHeaders.append('Authorization', `Bearer ${token}`)

  })




  const fetchData = async () => {
      try {
          const response = await axios.get(`${API_URL}/jobs`);
          if (response.status === 200) {
            console.log(response.data.data)
              setJobs(response.data.data);
          }
      } catch (error) {
          console.error(error);
      }
  };
   
  useEffect(() => {
      fetchData();
  }, []);
  const fetchJobDescription = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/job/`+id);
          if (response.status === 200) {
            console.log(response.data.data)
              setJobDetails(response.data.data);
          }
    } catch (error) {
        console.error(error);
    }
};
const deleteJob = async (id)=>{
    const response = await axios.delete(`${API_URL}/delete_job/`+id, {headers:myHeaders});
    if( response.status===200){
        toast.success("job deleted successfully")
    }
    else{
        console.log("error while deleing job")
        console.log(response)
    }
}
function search(data) {
  if (searchQuery.length > 1)
    return data.filter((job) =>
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase()));
}

  return (
 <div>
  <ToastContainer/>

<div style={{ padding: '16px', background: '#f1f3f7', height: '200px', width: '80%', margin: 'auto', borderRadius: '5px' }}>
        <div className='mb-3  m-auto' style={{ padding: '16px', width: '80%', height: '100px', background: '#ffffff', marginTop: 'auto' }}>
          <input className='h-100 mr-3  form-control' onChange={(e) => setSearchQuery(e.target.value)} type='text' placeholder='search' />

       
       </div>
      </div>
 <div className='d-flex'>

<div className='container d-flex'>
  <div>
<div className='row row-cols-1 mt-3 row-cols-md-2 g-4 w-100'>

{search(jobs) &&search(jobs).map((dataObj)=>{
  return(
    <div className='col'>
    <div className="card mb-3" key={dataObj.job_id} style={{ boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.15)", height: '300px' }}>
      <div className="card-body">
        <h5 className="card-title">{dataObj.job_title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{dataObj.location}</h6>
        <hr />
        <p className="card-text">{dataObj.job_description}</p>
       

<h6 className='text-center'>Deadline: {dataObj.ExpiryDate.toLocaleString().slice(0, 19).replace('T', ' ')}</h6>
<a href="#"  onClick={() => {
            fetchJobDescription(dataObj.job_id);
          }}  className="btn btn-primary mb-3 w-75 m-auto">View</a>
      </div>
    

    </div>
  </div>
  )
})}
</div>
<div className='row row-cols-1 row-cols-md-2 g-4 w-100'>

{jobs.map(job => {
  const jobID = job.job_id;
  return (
    <div className='col'>
      <div className="card mb-3" key={job.job_id} style={{ boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.15)", height: '300px' }}>
        <div className="card-body">
          <h5 className="card-title">{job.job_title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{job.location}</h6>
          <hr />
          <p className="card-text">{job.job_description}</p>
          <p className='text-center'>Deadline: {job.ExpiryDate.toLocaleString().slice(0, 19).replace('T', ' ')}</p>
        <a href="#"  onClick={() => {
            fetchJobDescription(jobID);
          }}  className="btn btn-primary mb-3 w-75 m-auto">View</a>
        </div>
        

      </div>
    </div>
  )
})}
</div>
</div>
    <div className=' w-100 mt-3'>

            <div className="card mb-3 p-3" style={{ float:'left'}}>
            <div className="card-body text-leftc:\Users\M\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20240613-1328-53.4379045.mp4">
              
            <h1>Job Description</h1>
              <h3 className="card-title">{jobDetails.job_title}</h3>
              {/* <h6 className="card-subtitle mb-2 text-muted"><a href='/'>Company Name</a></h6> */}
              
              
              <div className="card-text">
{jobDetails.job_description}
              <h5>Pay: {jobDetails.salary} Rs </h5>  
              <h5>Location: {jobDetails.location}</h5>
              
          <div>
              <h5>Full Job Description</h5>
              <div>
                  <h5>
                      {jobDetails.job_description}
                  </h5>
                  <h5>Requirements</h5>
                  {jobDetails.requirements}
                  <h5>Key Responsibilities</h5>
                  <p>
                  To apply, please send your resume and a portfolio showcasing your relevant work to:

                  </p>
                  <h5>email</h5>
                  <h5>Date Posted: {jobDetails.PostingDate &&jobDetails.PostingDate.toLocaleString().slice(0,19).replace('T', ' ')}</h5>

                  <h5>Application Deadline : {jobDetails.ExpiryDate}</h5>
              </div>
          </div>
                  </div>
                  <div className='d-flex mb-3'>
                <button className='btn btn-danger w-25 m-auto' onClick={()=>{deleteJob(jobDetails.job_id)}} >Delete job</button>
          </div>
            </div>
          </div>





    </div>

</div>


        </div>
        </div>
    )
}