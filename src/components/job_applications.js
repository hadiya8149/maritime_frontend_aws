import React from 'react'
import axios from 'axios'
import msg_icon from '../assets/icons8-message-50.png'
import { useState,useEffect } from 'react'
import '../css/employer.css'
import { useNavigate } from 'react-router-dom'
import jobImage from '../assets/onboared-laptop.jpg'
import { API_URL } from '../utils'
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function JobApplications(){
  const employer_id = localStorage.getItem('employer_id')
  
  const token = localStorage.getItem('authToken')
  const myHeaders = new Headers()

  const [applications, setApplications]=useState([])
  const [notifications, setNotifications]=useState([])
  const [messages, setMessages]=useState([])

  const [jobForm, setJobForm] =useState({
    job_title:'',
    job_description:'',
    requirements:'',
    location:'',
    salary:0,
    employer_id:employer_id, //only for test purpose,
    PostingDate: new Date().toISOString().slice(0,10),
    ExpiryDate: ''
  })
  const user_id = localStorage.getItem('user_id')
  const [editJobForm, setEditJobForm]=useState({})
  const [applicants, setApplicants]=useState([])
  const [msgForm, setMsgForm]=useState([])
  const [jobseeker_id, setJobseeker_id]=useState()
  useEffect(()=>{
    myHeaders.append('Authorization',`Bearer ${token}`)
  })
  async function fetchApplications(){
    console.log("fetching data")
    try{
        axios.get(`${API_URL}/get_job_by_employer_id/`+employer_id, {headers:myHeaders})
        .then(
            (data)=>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(data)
                   if(data.status===200){
                    console.log(data.data.data)
                    setApplications(data.data.data)
                   }
                }, 1);
              }),
        )
        .catch((err) => {
            if(err.response) console.log("this is error.response.dat",err.response.data);
        });
    }
    catch (e){
        console.log(e)
    }
  }
  async function DeleteJob(id){
    console.log(id)
    axios.delete(`${API_URL}/delete_job/`+id, {headers:myHeaders})
        .then(
            (data)=>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                   if(data.status===200){
                    console.log(data.data.message)
                    toast.info("Job deleted successfully!")
                   }
                }, 1);
              }),
        )
        .catch((err) => {
            if(err.response) console.log("this is error.response.dat",err.response.data);
        });
  }
  async function createJob(){
    console.log(jobForm)
    try{
      await axios.post(`${API_URL}/create_job/`, {body:jobForm},{headers:myHeaders})
      .then(
          (data)=>
          new Promise((resolve, reject) => {
              setTimeout(() => {
                 if(data.status===201){
                  console.log(data.data.message)
                  console.log(data.data.result)
                  toast.success("job created successfully")
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
  function handleChange(e) {
    const { name, value } = e.target;
    setJobForm(prevData => ({
        ...prevData, [name]: value
    }))
}
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditJobForm(prevData => ({
        ...prevData, [name]: value
    }))
  }

  async function editJob(id){

    for (let i=0;i<applications.length;i++){
      if (applications[i].job_id===id){
        const { PostingDate, ...editJobFormData } = applications[i];
        setEditJobForm(editJobFormData);
        break;
      }
    }
   

  }
  function getpdf(filepath){
    window.open('http://localhost:8000/'+filepath)
}
  async function submitEditJobForm(id){
    try{
      await axios.put(`${API_URL}/update_job/`+id, {body:editJobForm})
      .then(
          (data)=>
          new Promise((resolve, reject) => {
              setTimeout(() => {
                 if(data.status===200){
                  console.log(data.data.message)
                  toast.info("job Updated successfully")
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
  async function getApplicantsByJobId(id){
    try {
      const response = await axios.get(`${API_URL}/applicants/` + id, {headers:myHeaders});
      if (response.status === 200) {
        setApplicants(response.data.data); // Update applicants directly
      } else {
        if (response.response) {
          toast.info("No applicants found");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  async function getNotifications(){
    const response = await axios.get(`${API_URL}/notification_by_user_id/`+user_id, {headers:myHeaders})
    console.log(response)
    setNotifications(response.data)
}
  async function sendRejectNotification(id){
  const content = "Thank you for taking the time to apply. We regret to inform that we have moved with another applicant."
  
  const notificationType="reject";
  const response = await axios.post(`${API_URL}/sendnotificationtouser/`+id, {content:content, notificationType:notificationType}, {headers:myHeaders});
  console.log(response)
  }
async function deleteJobApplication(app){
  const id=app.app_id
  
  const response = await axios.delete(`${API_URL}/delete_job_application/`+id, {headers:myHeaders});
  if (response.status===200){
    toast.success("job deleted successfully")

  }
  else{
    console.log(response)
  }
  console.log(applicants);
  sendRejectNotification(app.jobSeeker_id)
  setApplicants((prevApplicants) => prevApplicants.filter((applicant) => applicant.id !== applicant.id)); // Filter out deleted applicant

}

  function handleMsgChange(e){
    
    const { name, value } = e.target;
    setMsgForm(prevData => ({
        ...prevData, [name]: value
    }))
    console.log(msgForm)
  }
  async function submitMessage(id){
    const response = await axios.post(`${API_URL}/send_message_to_jobSeeker/`+user_id, {
      subject:msgForm.subject,
      body:msgForm.body,
      jobseeker_id:id
    }, {headers:myHeaders})
    console.log(response)

  }
  async function fetchMessages(){
    console.log(user_id)
    const response = await axios.get(`${API_URL}/message_by_user_id/`+user_id, {headers:myHeaders});
    console.log(response.data)
    setMessages(response.data)
  }
  useEffect(()=>{
    fetchApplications()
    getNotifications();
    fetchMessages();
    
  },[])

    return (
      <>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary w-100">
  <div className="container-fluid">
  <button className="navbar-toggler " type="button"  data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""><ToggleButton  value="left" aria-label="left aligned" >
              <FormatAlignJustifyIcon/>
              </ToggleButton></span>
          </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/employer">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link"  onClick={fetchApplications} href="">My Jobs</a>
        </li>
        <li className="nav-item">
          <a  className="nav-link" href="#postJobModal" data-bs-toggle="modal" data-target="#postJobModal">Post a job</a>
        </li>
        <div className="dropdown">
                               
                                <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon} className='msg_icon'></img></a>
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
<ToastContainer/>

<div style={{minHeight:'100vh'}}>

<div>

<h3>Jobs created</h3>
<div className='m-auto'>
<div className='row row-cols-1 mt-3 row-cols-md-2 g-4 w-100'>

{applications.map(application => {
 const jobId =application.job_id;

 return(

<div className='col job-col' key={application.job_id}>
     <div className="card my-jobs mb-3 m-auto">
<div className="card-body">
<h5 className="card-title">{application.job_title}</h5>
<h6 className="card-subtitle mb-2 text-muted">{application.location}</h6>
<div style={{textAlign:'left'}}>
<h6>Job Description</h6><p>{application.job_description}</p>
<h6>Requirements</h6><p>{application.requirements}</p>
<span style={{fontWeight:'bold',fontSize:'14px'}}>Pay</span> {application.salary}<br/>
<span style={{fontWeight:'bold', fontSize:'14px'}}>Location</span> {application.location}<br/>
<span style={{fontWeight:'bold',fontSize:'14px'}}>Posting Date</span><span style={{fontSize:'12px'}}> {application.PostingDate.toLocaleString().slice(0,19).replace('T', ' ')}</span><br/>
<span style={{fontWeight:'bold',fontSize:'14px'}}>Expiry Date</span> <span style={{fontSize:'12px'}}>{application.ExpiryDate.toLocaleString().slice(0,19).replace('T', ' ')}</span><br/>
<hr />
<div style={{marginTop:'2%'}}>

<a href="#" onClick={()=>DeleteJob(jobId)} className="card-link link-danger">Delete Job</a>
<a href="#applicants"  onClick={()=>getApplicantsByJobId(application.job_id)}  className="card-link link-primary">View Applicants</a>
<a  className="card-link link-primary" onClick={()=>{editJob(jobId)}} href="#editJobModal" data-bs-toggle="modal" data-target="#editJobModal" >Edit Job</a>
</div>
</div>

</div>
</div>
   </div>
 )
})}
</div>
</div>
</div>
<div id='applicants' className='mb-3'>
<h3>Applicants</h3>
<table className='table m-auto' >
  <thead>
    <tr><td>Applicant id</td>
    <td >Resume URL</td>
    <td >Application Date</td>
    <td>Message</td>
    <td></td>
    <td></td>
    </tr>
  </thead>
<tbody>{applicants.map(application=>{
  return(
    <tr key={application.app_id}>
      <td>
      {application.jobSeeker_id}
      </td>
      <td id="resume_url_th">
      <a style={{color:'blue', textDecoration:'underline'}} onClick={()=>getpdf(application.ResumeURL)} >{application.ResumeURL}</a>
      </td>
      <td id='appDate'>
      {application.AppDate.toLocaleString().slice(0,19).replace('T', ' ')}
      </td>
      <td>
      <form  id="msgform" onSubmit={(e)=>{submitMessage(application.jobSeeker_id)}}>
              <input type='text'   placeholder='Subject' id='subject' className='form-control' onChange={handleMsgChange} name='subject' required/>
              <textarea  placeholder='enter text here' id='body' className='form-control' name='body'onChange={handleMsgChange} required/>
              <button type='submit' style={{ background:'#0069d9', color:'white'}} className="btn mr-3">Message</button>

            <br/>
        </form>
      </td>
      <td>
      <a  href="#"  onClick={()=>{deleteJobApplication(application)}} className='btn btn-danger mr-3'>Reject</a>

      </td>
    </tr>
   
  )
})}
</tbody>

</table>
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
            <input  type='text' className='form-control' id='editlocation' required name='location' value={editJobForm.location}  onChange={handleEditChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="editsalary" className="form-label">Salary</label>
            <input  type='text'  className='form-control' id='editsalary' required name="salary" value={editJobForm.salary} onChange={handleEditChange} />
          </div>
          <div className="mb-3 text-left">
            <label htmlFor="editdeadline" className="form-label">Deadline to apply</label>
            <input  type='text' id='editdeadline' className='form-control' required name='ExpiryDate'value={editJobForm.ExpiringDate} onChange={handleEditChange} />
          </div>
            <label htmlFor="postingDate" className="form-label" style={{fontSize:'14px'}}>Posting Date { new Date().toISOString().slice(0,19).replace('T', ' ')}</label>
            <br/>
          <button type="submit"  onClick={()=>submitEditJobForm(editJobForm)} className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
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
</>

    )
}