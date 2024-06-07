
import React from 'react'

import {useState, useEffect} from 'react';
import axios from 'axios'
import AdminNavbar from './admin_navbar';
export default function ManageJobs(){
  const [jobs, setJobs] = useState([])
  const [editJobForm, setEditJobForm]=useState({})
  const [jobDetails ,setJobDetails]=useState([])
  const [searchQuery, setSearchQuery]=useState('')
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditJobForm(prevData => ({
        ...prevData, [name]: value
    }))
  }


  async function editJob(id){

    setEditJobForm(editJobForm);
 
  }
  async function submitEditJobForm(id){
    try{
      const response = await axios.put('http://localhost:8000/api/update_job/'+id, {body:editJobForm})
      .then(
          (data)=>
          new Promise((resolve, reject) => {
              setTimeout(() => {
                 if(data.status===200){
                  console.log(data.data.message)
                  alert("job Updated successfully")
                 }
              }, 1);
            }),
      )
      .catch((err) => {
          if(err.response) console.log("this is error.response.dat",err.response.data);
      })        ;
    }
    catch(e){
        console.log(e)
    }

  }
  useEffect(() => {
    console.log(editJobForm);
    // Place any logic here that depends on the updated editJobForm state
  }, [editJobForm]);
  const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/jobs');
          if (response.status === 200) {
            console.log(response.data.data)
              setJobs(response.data.data);
          }
      } catch (error) {
          console.error(error);
      }
  };
  const editJobDetails = async (data)=>{
    setEditJobForm(data)
    console.log(editJobForm)
  }
    
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
const deleteJob = async (id)=>{
    const response = await axios.delete("http://localhost:8000/api/delete_job/"+id);
    if( response.status===200){
        alert("job deleted successfully")
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
<AdminNavbar/>
<div style={{ padding: '16px', background: '#f1f3f7', height: '200px', width: '80%', margin: 'auto', marginTop: 'auto', borderRadius: '5px' }}>
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
          }}  className="btn btn-primary mb-3 w-75 m-auto">View</a>

      </div>
    </div>
  )
})}
</div>
</div>
    <div className=' w-100 mt-3'>

            <div className="card mb-3 p-3" style={{ float:'left'}}>
            <div className="card-body">
              
            <h1>Job Description</h1>
              <h3 className="card-title">{jobDetails.job_title}</h3>
              {/* <h6 className="card-subtitle mb-2 text-muted"><a href='/'>Company Name</a></h6> */}
              
              
              <div className="card-text">
{jobDetails.job_description}
              <h5>Pay: {jobDetails.salary} Rs </h5>  
              <h5>Location: {jobDetails.location}</h5>
              <div className='d-flex mb-3'>
              <a  className="btn btn-info  m-auto w-50 mr-3" onClick={()=>{editJobDetails(jobDetails)}} href="#editJobModal" data-bs-toggle="modal" data-target="#editJobModal" >Edit Job</a>
                <button className='btn btn-danger w-25 m-auto' onClick={()=>{deleteJob(jobDetails.job_id)}} >Delete job</button>
          </div>
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
          
            </div>
          </div>





    </div>

</div>
<div  className="modal fade" id="editJobModal" tabIndex="-1" aria-labelledby="editJobModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editJobModalLabel">Edit Job</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={()=>{submitEditJobForm(editJobForm.job_id)}}>
          <div className="mb-3">
            <label htmlFor="editJobTitle" className="form-label"></label>
            <input type="text" className="form-control" id="editJobTitle" name='job_title' value={editJobForm.job_title} onChange={handleEditChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="editjobDescription" className="form-label">Job Description</label>
            <textarea  className="form-control" id="editjobDescription" name='job_description'value={editJobForm.job_description}  onChange={handleEditChange} rows="3" required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="editjobDescription" className="form-label">Requirements</label>
            <textarea className="form-control" id="editjobDescription" rows="3" name='requirements' value={editJobForm.requirements}  onChange={handleEditChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="editlocation" className="form-label">Location</label>
            <input  type='text' id='editlocation' required name='location' value={editJobForm.location}  onChange={handleEditChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="editsalary" className="form-label">Salary</label>
            <input  type='text' id='editsalary' required name="salary" value={editJobForm.salary} onChange={handleEditChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="editdeadline" className="form-label">Deadline to apply</label>
            <input  type='text' id='editdeadline' required name='ExpiryDate'value={editJobForm.ExpiringDate} onChange={handleEditChange} />
          </div>
            <label htmlFor="postingDate" className="form-label" style={{fontSize:'14px'}}>Posting Date { new Date().toISOString().slice(0,19).replace('T', ' ')}</label>
            <br/>
          <button type="submit" onClick={()=>submitEditJobForm(editJobForm)}  className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

        </div>
        </div>
    )
}