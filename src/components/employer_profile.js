import '../css/profile.css'
import '../css/messages.css'
import '../css/employer.css'
import {useState, useEffect, useCallback} from 'react'
import msg_icon from '../assets/icons8-message-50.png'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils';
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

import profile_image from '../assets/profile-icon-design-free-vector.jpg'
export default function EmployerProfile() {
  const [enableEdit, setEnableEdit]=useState(false)
    const [profile, setProfile]=useState([])
    const navigate = useNavigate()
    const [editProfile, setEditProfile]=useState([])
    const employer_id=localStorage.getItem('employer_id')
  const [notifications, setNotifications]=useState([])
  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('authToken')
  const myHeaders = new Headers()
  useEffect(()=>{
    myHeaders.append('authentication',`Bearer ${token}`)
  })
  const [messages, setMessages]=useState([])
    async function fetchMessages(){
      console.log(user_id)
      const response = await axios.get(`${API_URL}/message_by_user_id/`+user_id, {headers:myHeaders});
      console.log(response.data)
      setMessages(response.data)
    }
    const fetchProfile = useCallback(async () => {
        try {
            const employer_id = localStorage.getItem("employer_id")

            const response = await axios.get(`${API_URL}/employer/`+employer_id, {headers:myHeaders});
            if (response.status === 200) {
              console.log(response.data.data)
              setProfile(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    }, []);
    async function handleSubmit(){
      const response = await axios.put(`${API_URL}/update_employer/`+employer_id, 
      {body:editProfile}, {headers:myHeaders})
      console.log("respnose", response)
    }
    function handleChange(e){
      e.preventDefault()
      const { name, value } = e.target;
      setEditProfile(prevData => ({
          ...prevData, [name]: value
      }))
    }
    async function getNotifications(){
      const response = await axios.get(`${API_URL}/notification_by_user_id/`+user_id,{headers:myHeaders})
      console.log(response)
      setNotifications(response.data)
  }
  useEffect(() => {
    fetchProfile();
    getNotifications();
    fetchMessages()
},[]);
    return (
        <div style={{minHeight:'100vh'}}>
                        <nav className="navbar  navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <button className="navbar-toggler " type="button"  data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""><ToggleButton  value="left" aria-label="left aligned" >
              <FormatAlignJustifyIcon/>
              </ToggleButton></span>
          </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="/employer">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link"  href="/job_applications">My Jobs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/employer" >Post a job</a>
        </li>
        <div className="dropdown">
                               
                                <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon} className='msg_icon'></img></a>
                                <ul className="dropdown-menu messaages" style={{width:'500px'}}>
                                {messages.length === 0 ? (
      <li className="">No Messages</li>
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
      </ul>
    </div>
  </div>
</nav>

<div className='container' style={{display:'flex', justifyContent:'center',minHeight:'80vh', alignItems:'center'}} >
           <div className='card'>
  <div className='row'>
            <div className='col-sm  p-0' >

                  <div className='card gradient-custom'>
                  <div className="card-body" >
                            
                            <img src={profile_image} style={{ height: '100px', width: '100px' }} className="card-img" alt="..."></img>
                            <div className='mb-3' style={{color:'white'}}>
                                <h3 style={{color:'white'}}>Personal Details</h3>

                            <h4 style={{color:'white'}} >username{profile.username}</h4>
                            <div>
                                <h4  style={{color:'white'}}>Employer id : {profile.employer_id}</h4>
                              
                            <h4  style={{color:'white'}}>Email: {profile.email}</h4>
                            </div>
                            </div>
                        </div>

                  </div>
            </div>
<div className='col p-0'>
<div className='card company' style={{border:'0px'}}>
<div className="">
      <div className="">
      <form className='m-auto w-100' onSubmit={handleSubmit}>
        <h4>Company info</h4>
           <input className='form-control' type='text' disabled={!enableEdit} placeholder='Company Name' defaultValue={profile.company_name}  onChange={handleChange} name='company_name'></input>
           <textarea className='form-control'  placeholder='Description '  disabled={!enableEdit} defaultValue={profile.description}onChange={handleChange} name='description'></textarea>
           <input className='form-control' type='text' placeholder="Company Website" disabled={!enableEdit}  defaultValue={profile.company_website} onChange={handleChange} name='company_website'></input>

           <h4>Contact Details</h4>
           <input className='form-control' type='email' placeholder="Your email" defaultValue={profile.email}  disabled={!enableEdit} onChange={handleChange} name='email'></input>

<input className='form-control' type='email' placeholder="Company email" defaultValue={profile.contact_email}  disabled={!enableEdit} onChange={handleChange} name='contact_email'></input>

          <div className='text-left mb-3' style={{ fontStyle:'italic' , textAlign:'left',color:'black', fontSize: '1.5rem',
    fontWeight: '700px'}}>+92({profile.contact_number})</div>
           <input className='form-control' type='number'  disabled={!enableEdit}  placeholder="Company number" defaultValue={profile.contact_number} onChange={handleChange} name='contact_number'></input>
          <h4>Company size</h4>
           <input className='form-control' type='number'  disabled={!enableEdit}  placeholder="Company Size" defaultValue={profile.company_size} onChange={handleChange} name='company_size'></input>
<h4>Location</h4>
<hr/>
<div>

</div>
           <input className='form-control' type='text' placeholder='Location' disabled={!enableEdit}  defaultValue={profile.location} onChange={handleChange} name='location'></input>


<hr/>
<div>
<button type="button" className="btn bg-info" onClick={()=>{setEnableEdit(true)}} style={{color:'white', marginRight:'5px', width:'100px'}} >Edit</button>
        <button type="submit" className="btn bg-primary"  style={{color:'white', width:'200px'}}>Save changes</button>

</div>
    
        </form>

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