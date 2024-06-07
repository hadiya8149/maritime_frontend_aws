import '../css/job.css';
import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios'
import jobPortalImage from '../assets/introduction-to-port-state-control-1.jpg'
import jobSearch from '../assets/img/illustrations/online-job-search-4836622-4032953.png'
export default function JobSearch(){


  const [jobs, setJobs] = useState([]) 
  const user_id = localStorage.getItem('user_id')
  const [jobseeker_id, setJobseeker_id]=useState([])
  const [jobDetails ,setJobDetails]=useState([])
  const [searchQuery, setSearchQuery]=useState([])
  function search(data){
    if(searchQuery.length>1)
    return data.filter((job)=>
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/jobs');
          console.log(response)
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
      const response = await axios.get('http://localhost:8000/api/job/'+id);
          if (response.status === 200) {
            console.log(response.data.data)
              setJobDetails(response.data.data);
              
          }
    } catch (error) {
        console.error(error);
    }
};
  const applyForJob = async(id)=>{
    const data = {
      jobSeeker_id:jobseeker_id,
      job_id:id,
      AppDate: new Date().toISOString().slice(0,19).replace('T', ' '),
      Status:'pending',
      ResumeURL : ''
    }
    const response = await axios.post('http://localhost:8000/api/create_job_application', {body:data})
  }
  return (
    <div>
      {/* <div className='w-100 h-25 mt-10 '><h1>Get your dream job </h1><img src={jobPortalImage}></img></div> */}
        <div className='d-flex' id = "job_portal">
    <div className="d-flex flex-column mt-7 flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
  <span className="fs-4">Search jobs</span>

  <hr />
  <input type="text" placeholder="search"   onChange={(e) => setSearchQuery(e.target.value)} className="m-2" />
  <ul className=" mb-auto" style={{listStyleType:'none', textAlign:'left'}}>
    <li className="nav-item">
      <h5>Job Type</h5>
      <select>
        <option>Full time</option>
        <option>Internship</option>
        <option>Part-time</option>
        <option>Remote</option>
      </select>
    </li>
    <li>
      <h5>Industry</h5>

      <div className="overflow-auto h-25">
        <ul style={{listStyleType:'none', textAlign:'left', paddingLeft:'5px'}}> 
          <li>
            <input type="checkbox" id="item1" value="item1" />
            <label htmlFor="item1">Tech & Development</label>
          </li>
          <li>
            <input type="checkbox" id="item2" value="item2" />
            <label htmlFor="item2">UI/UX Design</label>
          </li>
          <li>
            <input type="checkbox" id="item3" value="item3" />
            <label htmlFor="item3">Strategy</label>
          </li>
        </ul>
      </div>
    </li>
    <li>
     <h5> Location</h5>
      <div className="mb-3">
        <input type="text" placeholder="search" />
      </div>
    </li>
    <li>
      <h5>Salary</h5>
      <div className="salary-filter">
        <label htmlFor="salaryMin">Min:</label>
        <input type="number" id="salaryMin" name="salaryMin" />
        <label htmlFor="salaryMax">Max:</label>
        <input type="number" id="salaryMax" name="salaryMax" />
      </div>
    </li>
    <li>
     <h5>Date Posted</h5>
      <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" value="new" id="newDateCheckbox" />
          <label className="form-check-label" htmlFor="newDateCheckbox">New Date</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" value="old" id="oldDateCheckbox" />
          <label className="form-check-label" htmlFor="oldDateCheckbox">Old Date</label>
        </div>
      </div>
      <div className="mb-3">
        <button className='btn btn-primary'>Apply</button>
      </div>
    </li>
  </ul>
</div>
<div className='container mt-7' style={{marginLeft:'150px', marginRight:'150px', padding:'50px'}}>
<h2>Search Results</h2>
{search(jobs) && search(jobs).map((dataObj)=>{
    return(

        <div className='job-description ' style={{marginRight:'auto', marginBottom:'auto'}}>
        {/* <div className=''>
          <img src={jobSearch}></img>
        </div> */}
{/* <div className='mb-10'></div> */}
            <div className="card mb-3 p-3" style={{width: '100%', float:'left'}}>
            <div className="card-body">
              
            <h1>Job Description</h1>
              <h3 className="card-title">{jobDetails.job_title}</h3>
              <h6 className="card-subtitle mb-2 text-muted"><a href='/'>Company Name</a></h6>
              
              
              <div className="card-text">
{jobDetails.job_description}
                  <h5>Job type</h5>
              <h5>Pay: {jobDetails.salary} Rs </h5>  
              <h5>Location: {jobDetails.location}</h5>
              <div className='text-left mb-3'>
          <button className='btn btn-success mr-3' style={{height:'50px'}} onClick={()=>{applyForJob(jobDetails.job_id)}} >Apply Now</button><button className='btn btn-primary' style={{height:'50px', marginTop:'0'}}> save</button> 
          </div>
          <div>
              <h5>Full Job Description</h5>
              <div>
                  <h5>
                      {jobDetails.job_description}
                  </h5>
                  <h5>Requirements</h5>
                  <h5>Key Responsibilities</h5>
                  <p>
                  To apply, please send your resume and a portfolio showcasing your relevant work to:

                  </p>
                  <h5>email</h5>
                  <h5>Date Posted: {jobDetails.PostingDate && jobDetails.PostingDate.toLocaleString().slice(0, 10).replace('T', ' ')}</h5>

                  <h5>Application Deadline : {jobDetails.ExpiryDate && jobDetails.ExpiryDate.toLocaleString().slice(0, 10).replace('T', ' ')}
</h5>
              </div>
          </div>
                  </div>
          
            </div>
          </div>





    </div>

    )
}
    
)}
</div>

        </div>
        </div>
    )
}