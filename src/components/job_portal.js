// import '../css/job.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jobPortalImage from '../assets/introduction-to-port-state-control-1.jpg'
import jobSearch from '../assets/img/illustrations/online-job-search-4836622-4032953.png'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
export default function Job_Portal() {


  const [jobs, setJobs] = useState([])
  const user_id = localStorage.getItem('user_id')
  const jobSeeker_id = localStorage.getItem('jobSeeker_id')
  const [jobDetails, setJobDetails] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  function search(data) {
    if (searchQuery.length > 1)
      return data.filter((job) =>
        job.job_title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const fetchData =useCallback( async()=>{
    try {
      const response = await axios.get('http://localhost:8000/api/jobs');
      console.log(response)
      if (response.status === 200) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }

  })
  const fetchJobDescription = async (id) => {
    try {
      const response = await axios.get('http://localhost:8000/api/job/' + id);
      if (response.status === 200) {
        console.log(response.data.data)
        setJobDetails(response.data.data);

      }
    } catch (error) {
      console.error(error);
    }
  };
  const applyForJob = async (id) => {
    const res = await axios.get('http://localhost:8000/api/jobseeker/'+jobSeeker_id);
      const resume_url = res.data.data.resumeURL;
    const data = {
      jobSeeker_id: jobSeeker_id,
      job_id: id,
      AppDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      Status: 'pending',
      ResumeURL: resume_url
    }
    const response = await axios.post('http://localhost:8000/api/create_job_application', { body: data })
    if (response.status=200){
      alert("Applied to job successfully")
    }
    else{
      alert("please upload your resume in profile section")
    }
  }
  function filterJobs(data){
    if (filterQuery){
      console.log(filterQuery, "filter query")
      console.log("data",data)
      console.log(data.filter((obj)=>{
        return obj.location.toLowerCase()===filterQuery.toLowerCase();
      }))
      return data.filter((obj)=>{
        return obj.location.toLowerCase()===filterQuery.toLowerCase();
      })
        
    }
    
  }
  useEffect(()=>{
    fetchData();
  },[])
  const [filterQuery, setFilterQuery]=useState()
  function handleFilterChange(e){
    setFilterQuery(e.target.value)
    console.log("filter", filterQuery)
  }
  return (
    <div className='mt-8'>
      <div style={{ padding: '16px', background: '#f1f3f7', height: '200px', width: '80%', margin: 'auto', marginTop: 'auto', borderRadius: '5px' }}>
        <div className='mb-3  m-auto' style={{ padding: '16px', width: '80%', height: '100px', background: '#ffffff', marginTop: 'auto' }}>
          <input className='h-100 mr-3  form-control' onChange={(e) => setSearchQuery(e.target.value)} type='text' placeholder='Job Title' />
        </div>
        <label className='mr-3' >Location</label>
        <select onChange={(e) =>{handleFilterChange(e)}}>
          <option></option>
          <option name='islamabad' >Islamabad</option>
          <option name='karachi'>Karachi</option>
          <option name='lahore'>Lahore</option>
        </select>
      </div>
      <div className='d-flex' style={{ marginLeft: '250px', marginRight: '250px', marginTop: '25px' }}>

        <div className='' >

        <div className='row row-cols-1 mt-3 row-cols-md-2 g-4 w-100'>
{filterJobs(jobs)&& filterJobs(jobs).map((dataObj)=>{
  return(
    <div>
   <div className='col'>
    <div className="card mb-3" key={dataObj.job_id} style={{ boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.15)", height: '300px' }}>
      <div className="card-body">
        <h5 className="card-title">{dataObj.job_title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{dataObj.location}</h6>
        <hr />
        <p className="card-text">{dataObj.job_description}</p>
        <a onClick={() => {
          fetchJobDescription(dataObj.job_id);
        }}
        >View</a>
      </div>
      <h6 className='text-center'>Deadline: {dataObj.ExpiryDate.toLocaleString().slice(0, 19).replace('T', ' ')}</h6>
      <a href="#" className="btn btn-primary mb-3 w-75 m-auto">Easy Apply</a>

    </div>
  </div>
      </div>
  )
})}

{search(jobs) &&search(jobs).map((dataObj)=>{
  return(
    <div className='col'>
    <div className="card mb-3" key={dataObj.job_id} style={{ boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.15)", height: '300px' }}>
      <div className="card-body">
        <h5 className="card-title">{dataObj.job_title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{dataObj.location}</h6>
        <hr />
        <p className="card-text">{dataObj.job_description}</p>
        <a onClick={() => {
          fetchJobDescription(dataObj.job_id);
        }}
        >View</a>
      </div>
      <h6 className='text-center'>Deadline: {dataObj.ExpiryDate.toLocaleString().slice(0, 19).replace('T', ' ')}</h6>
      <a href="#" className="btn btn-primary mb-3 w-75 m-auto">Easy Apply</a>

    </div>
  </div>
  )
})}

</div>
<hr/>
  <br></br>
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
                    
                    </div>
                    <h6 className='text-center'>Deadline: {job.ExpiryDate.toLocaleString().slice(0, 19).replace('T', ' ')}</h6>
                    <a href="#"  onClick={() => {
                        fetchJobDescription(jobID);
                      }} className="btn btn-primary mb-3 w-75 m-auto">View</a>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='w-100'>
          <div className="card mb-3 p-3" style={{ width: '100%', float: 'left' }}>
            <div className="card-body">

              <h1>Job Description</h1>
              <h3 className="card-title">{jobDetails.job_title}</h3>
              <h6 className="card-subtitle mb-2 text-muted"><a href='/'>Company Name</a></h6>


              <div className="card-text">
                <h5>Pay: {jobDetails.salary} Rs </h5>
                <h5>Location: {jobDetails.location}</h5>
                <div className='text-left mb-3'>
                  <button className='btn btn-success mr-3' style={{ height: '50px' }} onClick={() => { applyForJob(jobDetails.job_id) }} >Apply Now</button>
                </div>
                <div>
                  <h5>Full Job Description</h5>
                  <div>
                    <h5>
                      {jobDetails.job_description}
                    </h5>
                    <h5>Requirements</h5>
                    <p className='text-left'>
                    {jobDetails.requirements}
                    </p>
                    <h5>Date Posted: {jobDetails.PostingDate && jobDetails.PostingDate.toLocaleString().slice(0, 10).replace('T', ' ')}</h5>

                    <h5>Application Deadline : {jobDetails.ExpiryDate && jobDetails.ExpiryDate.toLocaleString().slice(0, 10).replace('T', ' ')}
                    </h5>
                  </div>
                </div>
              </div>

            </div>
          </div>





        </div>

      </div>

    </div>
  )
}