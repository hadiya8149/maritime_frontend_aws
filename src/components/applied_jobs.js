import '../css/job.css';
import React from 'react'
import msg_icon from '../assets/icons8-message-50.png'

import { useCallback, useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function AppliedJobs() {
  const navigate = useNavigate()
  const [notifications, setNotifications]=useState([])

    const [myJobs, setmyJobs] = useState([])
    const user_id = localStorage.getItem('user_id')
    const jobSeeker_id = localStorage.getItem('jobSeeker_id')
  const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/applied_jobs_by_user/'+jobSeeker_id);
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
    const response = await axios.get("http://localhost:8000/api/notification_by_user_id/"+user_id)
    console.log(response)
    setNotifications(response.data)
}
  useEffect(() => {
      fetchData();
    getNotifications();

  },[]);
    return (
        <div style={{marginBottom:'20%'}}>
     <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ marginTop: "5%" }}>
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

                                <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon} className='msg_icon'></img></a>
                                <ul className="dropdown-menu messaages">
                                    <li><a className="dropdown-item" href="#">Mark all as read</a></li>
                                    <li><a className="dropdown-item" href="#">Notification 1</a></li>
                                    <li><a className="dropdown-item" href="#">Notification 2</a></li>
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