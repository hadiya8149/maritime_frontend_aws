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
  const [notifications, setNotifications]=useState([])
  const [messages, setMessages]=useState([])
  
  const user_id= localStorage.getItem('user_id')
  async function fetchMessages(){
    
  const myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${token}`)
    console.log(user_id)
    console.log(myHeaders)
    const response = await axios.get(`${API_URL}/message_by_user_id/`+user_id, {headers:myHeaders});
    console.log(response.data)
    setMessages(response.data)
  }
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
          else{
            console.log(response)
          }
      } catch (error) {
          console.error(error);
      }
  };

  async function getNotifications(){
    
  const myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${token}`)
    const response = await axios.get(`${API_URL}/notification_by_user_id/`+user_id, {headers:myHeaders})
    console.log(response)
    setNotifications(response.data)
}
  useEffect(() => {
    
      fetchData();
    getNotifications();
fetchMessages()
  },[]);
    return (
        <div style={{marginBottom:'20%'}}>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/jobseeker">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" target="_blank" href="/jobs">View jobs</a>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" style={{ border: 'None', background: 'white', }} onClick={fetchData}>My Applications</button>
                            </li>
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
                            <div className="dropdown">
                               
                               <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon} alt='msg dropdown' className='msg_icon'></img></a>
                               <ul className="dropdown-menu messaages overflow-auto" style={{width:'600px', height:'500px'}}>
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
                            <li className="nav-item">
                                <a className="nav-link" href='/jobseeker_profile' role='button'>Profile</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
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
    {myJobs.map((myJob)=>{
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