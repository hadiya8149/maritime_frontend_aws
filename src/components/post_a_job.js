import 'react-toastify/dist/ReactToastify.css';
import '../css/employer.css'

import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { API_URL } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
const myHeaders = new Headers()

export default function PostJob(){
    useEffect(()=>{
        myHeaders.append('Authorization',`Bearer ${localStorage.getItem('authToken')}`)
      })
    const employer_id=localStorage.getItem('employer_id')
    const user_id = localStorage.getItem('user_id')
    const role = localStorage.getItem('role')
    const [jobForm, setJobForm] = useState({
        job_title: '',
        job_description: '',
        requirements: '',
        location: '',
        salary: 0,
        employer_id: employer_id, //only for test purpose,
        PostingDate: new Date().toISOString().slice(0, 10),
        ExpiryDate: ''
      })
    
    function handleChange(e) {
        const { name, value } = e.target;
        setJobForm(prevData => ({
          ...prevData, [name]: value
        }))
      }
    async function createJob() {
        console.log(jobForm)
        
        try {
          await axios.post(`${API_URL}/create_job`, { body: jobForm }, {headers:myHeaders})
            .then(
              (data) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (data.status === 201) {
                      console.log(data.data.message)
                      console.log(data.data.result)
                      toast.success("job created successfully")
                    }
                  }, 1);
                }),
            )
            .catch((err) => {
              if (err.response) console.log("this is error.response.dat", err.response.data);
            });
        }
        catch (e) {
          console.log(e)
        }
      }
    return(
    <div className='container m-auto'>

<div className='p-5'>
  <div className='col-md-12' >
    <div >
      <h1 >Post a Job</h1>
    </div>
    <div className='text-left'>
      <form onSubmit={createJob} style={{width:'600px', margin:'auto'}}>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Job Title</label>
          <input type="text" className="form-control" id="jobTitle" name='job_title' onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescription" className="form-label">Job Description</label>
          <textarea className="form-control" id="jobDescription" name='job_description' onChange={handleChange} rows="3" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="Requirements" className="form-label">Requirements</label>
          <textarea className="form-control" id="Requirements" rows="3" name='requirements' onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3" style={{ textAlign: 'left' }}>
          <input type='text' id='location' className='form-control' required name='location' placeholder='Location' onChange={handleChange} />
        </div>
        <div className="mb-3" style={{ textAlign: 'left' }}>
          <input type='text' id='salary' className='form-control' required name="salary" placeholder='Salary' onChange={handleChange} />
        </div>
        <div className="mb-3" style={{ textAlign: 'left' }}>
          <input type='text' id='deadline' className='form-control' required name='ExpiryDate' placeholder='Deadline' onChange={handleChange} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="postingDate" className="form-label" style={{ fontSize: '14px' }}>Posting Date {new Date().toISOString().slice(0, 10)}</label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
</div>
)
}