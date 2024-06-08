import axios from 'axios'
import msg_icon from '../assets/icons8-message-50.png'
import { useState, useEffect } from 'react'
import React from 'react'
import '../css/employer.css'
import { useNavigate } from 'react-router-dom'
export default function EmployerPortal() {
  
  const user_id = localStorage.getItem('user_id')
  const navigate=useNavigate('')
  const employer_id=localStorage.getItem('employer_id')
  
  const role = localStorage.getItem('role')
  const [notifications, setNotifications]=useState([])
  const [messages, setMessages]=useState([])
  async function fetchMessages(){
    console.log(user_id)
    const response = await axios.get("http://localhost:8000/api/message_by_user_id/"+user_id);
    console.log(response.data)
    setMessages(response.data)
  }
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

  async function createJob() {
    console.log(jobForm)
    try {
      await axios.post('http://localhost:8000/api/create_job', { body: jobForm })
        .then(
          (data) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (data.status === 201) {
                  console.log(data.data.message)
                  console.log(data.data.result)
                  alert("job created successfully")
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

  
  async function fetchEmployerId() {
    const response = await axios.get('http://localhost:8000/api/employer_by_user_id/' + user_id)
    // console.log(response)
    console.log(response.data.data)
    localStorage.setItem('employer_id', response.data.data.employer_id)
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setJobForm(prevData => ({
      ...prevData, [name]: value
    }))
  }
  async function getNotifications(){
    const response = await axios.get("http://localhost:8000/api/notification_by_user_id/"+user_id)
    console.log(response)
    setNotifications(response.data)
}
useEffect(()=>{
  if(role){
    if (role.toLowerCase()==='employer'){
      fetchEmployerId()
      getNotifications()
      fetchMessages();
    }
    else{
    navigate('/')
    }

  }
  else{
    navigate('/')
  }
}, [])
  return (
    <div className='h-100'>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary" style={{ marginTop: '5%' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/employer">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/job_applications">My Jobs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#postJobModal" data-bs-toggle="modal" data-target="#postJobModal">Post a job</a>
              </li>
              <div className="dropdown">

                <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon}alt='msg dropdown' className='msg_icon'></img></a>
                <ul className="dropdown-menu messaages" style={{width:'500px'}}>
                                {messages.length === 0 ? (
      <li className="">No notifications</li>
    ) : (
      messages.map((message) => (
        <li key={message.message_id} >
          {message.body}<h6 style={{textAlign:'right', fontSize:'8px'}}>{message.Timestamp.toLocaleString().slice(0,19).replace('T' , ' ')}</h6>
          <hr/>
        </li>
      ))
    )}
                                </ul>
              </div>
              <div className="dropdown">
                                <a className="nav-link fw-medium dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Notifications
                                </a>
                                <ul className="dropdown-menu notifications">
                                {notifications.length === 0 ? (
      <li className="">No notifications</li>
    ) : (
      notifications.map((notification) => (
        <li key={notification.notification_id} >
          {notification.content} {/* Assuming notifications have a title property */}
          <hr/>
        </li>
      ))
    )}
                                </ul>
                            </div>
              <li className="nav-item px-2"><a className="nav-link fw-medium" href='/employer_profile' role='button'>
                Profile
              </a></li>
              {/* <li className="nav-item px-2"><a className="nav-link fw-medium" onClick={handleLogout} href='#' role='button'>
                                Logout
                            </a></li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div className='container m-auto p-5 '>

        <h2 style={{ marginBottom: '6%' }}>Welcome to Maritime Employer Management</h2>
        <p style={{ textAlign: 'left' }}>
          We are partnered with a diverse array of maritime recruitment companies. These industry leading partners recognise the value of our courses and seek out MTA trained individuals for their recruitment needs.
        </p>
        <div style={{ textAlign: 'left', marginBottom: '5%', marginTop: '5%' }}>
          <h5>What you can do through the Martime Employer Portal</h5>
          <ul style={{ listStyleType: 'square' }}>
            <li>Post Job Opportunities</li>
            <li>Option to collect job applications through the system</li>
            <li>Request interview scheduling</li>
            <li>Target program disciplines key to your business needs</li>
            <li>Find trained and certified Job seekers</li>
          </ul>

        </div>

        <div className="modal fade" id="postJobModal" tabIndex="-1" aria-labelledby="postJobModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="postJobModalLabel">Post a Job</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={createJob}>
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
                    <input type='text' id='location' required name='location' placeholder='Location' onChange={handleChange} />
                  </div>
                  <div className="mb-3" style={{ textAlign: 'left' }}>
                    <input type='text' id='salary' required name="salary" placeholder='Salary' onChange={handleChange} />
                  </div>
                  <div className="mb-3" style={{ textAlign: 'left' }}>
                    <input type='text' id='deadline' required name='ExpiryDate' placeholder='Deadline' onChange={handleChange} />
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



      </div>


    </div>
  )
}