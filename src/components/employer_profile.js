import '../css/profile.css'
import '../css/messages.css'
import {useState, useEffect, useCallback} from 'react'
import msg_icon from '../assets/icons8-message-50.png'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils';

import profile_image from '../assets/profile-icon-design-free-vector.jpg'
export default function EmployerProfile() {

    const [profile, setProfile]=useState([])
    const navigate = useNavigate()
    const [editProfile, setEditProfile]=useState([])
    const employer_id=localStorage.getItem('employer_id')
  const [notifications, setNotifications]=useState([])
  const user_id = localStorage.getItem('user_id')

  const [messages, setMessages]=useState([])
    async function fetchMessages(){
      console.log(user_id)
      const response = await axios.get(`${API_URL}/message_by_user_id/`+user_id);
      console.log(response.data)
      setMessages(response.data)
    }
    const fetchProfile = useCallback(async () => {
        try {
            const employer_id = localStorage.getItem("employer_id")

            const response = await axios.get(`${API_URL}/employer/`+employer_id);
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
      {body:editProfile})
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
      const response = await axios.get(`${API_URL}/notification_by_user_id/`+user_id)
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
                        <nav className="navbar  navbar-expand-lg bg-body-tertiary" style={{marginTop:'5%'}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
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
            <div className="container d-flex mt-10">
                <div className="left-side mr-3">
                    <div className="card mb-3" style={{ width: '300px', height: '300px' }}>
                        <div className="card-body">
                            
                            <img src={profile_image} style={{ height: '100px', width: '100px' }} className="card-img" alt="..."></img>
                            <div className='mb-3'></div>
                                <h5 className="card-title">Personal Details</h5>

                            <h6>username{profile.username}</h6>
                            <div className="card-text text-left">
                                <h6>Employer id : {profile.employer_id}</h6>
                              
                            <h6>Email: {profile.email}</h6>

                            </div>
                        </div>
                    </div>
      
                   
                </div>
                <div className="right-side ml-3">
                
                    <div>
                       <h4>Company Details</h4>
                       <div className="card" style={{ width: '920px' }}>
  <div className="card-body">
      <div className="card-text">
        <h6>Name: {profile.company_name}</h6>
        <h6>Description: {profile.description}</h6>

        <h6>Location : {profile.location}</h6>
        <h6>Employees : {profile.company_size}</h6>
        <div style={{textAlign:'left'}}>
          <span >Website: </span><a className='link link-primary' href={profile.company_website}>{profile.company_website}</a>
        </div>
        <div className='text-left'>
            <span>Contact email </span>
          <a className='card-link link-info' href={profile.contact_email}>{profile.contact_email}</a>
       <div>
       <a  href="#editEmployerDetails" data-bs-toggle="modal" data-target="#editEmployerDetails"   className=" card-link btn btn-primary text-left">Edit</a>

       </div>

        <div className="modal fade" id="editEmployerDetails" tabIndex="-1" aria-labelledby="editEmployerDetails" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className='m-auto w-100' onSubmit={handleSubmit}>
           <input className='form-control' type='text' placeholder='Company Name'  onChange={handleChange} name='company_name'></input>
           <input className='form-control' type='email' placeholder="Your email" onChange={handleChange} name='email'></input>

           <input className='form-control' type='email' placeholder="Company email" onChange={handleChange} name='contact_email'></input>
           <input className='form-control' type='number' placeholder="Company number" onChange={handleChange} name='contact_number'></input>
           <input className='form-control' type='text' placeholder="Company Website" onChange={handleChange} name='company_website'></input>
           <input className='form-control' type='number' placeholder="Company Size"  onChange={handleChange} name='company_size'></input>

           <input className='form-control' type='text' placeholder='Location' onChange={handleChange} name='location'></input>
           <textarea className='form-control'  placeholder='Description' onChange={handleChange} name='description'></textarea>


<hr/>
<div>
<button type="button" className="btn bg-secondary" style={{color:'white', marginRight:'5px', width:'100px'}} data-bs-dismiss="modal">Close</button>
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
                    </div>
                </div>
            </div>
            </div>
    )
}