import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css'
import { API_URL } from '../utils';
import axios from 'axios'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { responsiveFontSizes } from '@mui/material';
import qs from 'qs'
import { get } from 'aws-amplify/api/server';
export default function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])

  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('authToken')
  const [unRead, setUnRead]=useState(0)
  const [unReadNotifications, setUnReadNotifications]=useState([])
  const user_id=localStorage.getItem('user_id')

  function handleLogout() {
    localStorage.clear();
    navigate('/login')
    
  }
  async function getNotifications() {
    await axios.get(`${API_URL}/notification_by_user_id/` + user_id, { headers: {"Authorization":`Bearer ${localStorage.getItem('authToken')}`} }).then((response)=>{
      
      console.log(response)
      if(response.status===200){
        const data = response.data
        setNotifications(data)
        countUnReadNotifications(data)
        
      }
    }).catch((err)=>{console.log(err)})

  }
  async function updateNotifications(setUnRead){
    for(const notification of unReadNotifications){
      console.log(notification)
      let notification_id = notification.notification_id;
      console.log(notification_id)
      const data = qs.stringify(notification_id)
       const response = axios.put(`${API_URL}/update_notification/${notification_id}`,data,    {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }
      }

    )
    }
    getNotifications()
    countUnReadNotifications(notifications)
  }
async function countUnReadNotifications(data){
  setUnReadNotifications(data.filter(notification => !notification.IsRead));
  const count = data.filter(notification => !notification.IsRead).length;
   
  console.log(count)
  setUnRead(count)
  return count

}



    useEffect( ()=>{
      if(token){
      
        getNotifications();
      }
      
    },[])
    useEffect(()=>{
      console.log(notifications)
    },[])
  return (
    <nav className="navbar navbar-expand-lg navbar-light " data-navbar-on-scroll="data-navbar-on-scroll" style={{ background: 'rgb(7 48 91)', marginBottom: '0px' }}>
      <div className="container-fluid"><a className="navbar-brand d-flex align-items-center fw-bolder fs-2 fst-italic" href="/">
        <div className="text-info">Mari</div>
        <div className="text-warning">Time</div>
      </a>
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" style={{ marginRight: '10%' }} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto pt-2 pt-lg-0">
            <li className="nav-item px-2"><a className="fw-medium nav-link" aria-current="page" href="/">Home</a></li>

            <li style={{ display: role === 'admin' ? '' : role === 'employer' ? '' : role === 'Job Seeker' ? '' : !username?'':'none'}}>
              <a className={window.location.pathname === '/jobs' ? "active fw-medium nav-link" : "fw-medium nav-link"} href={role === 'admin' ? 'manage_jobs' : '/jobs'}>Jobs</a>
            </li>


            <li style={{ display: role === 'admin' ? 'none' : !username || role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/courses_list' ? "active fw-medium nav-link" : "fw-medium  nav-link "} href="/courses_list">Courses</a></li>
            <li style={{ display: role === 'admin' ? 'none' : !username || role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/programs' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/programs">Training Programs</a></li>
            <li style={{ display: role === 'admin' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/programs' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/programs&courses_management"> Courses and programs</a></li>
            <li style={{ display: role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/student' ? "active fw-medium nav-link " : "fw-medium nav-link "} href="/student">Student Portal</a></li>
            <li style={{ display: role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/my_course&program' ? "active fw-medium nav-link " : "fw-medium nav-link "} href="/my_course&programs">My Courses & programs</a></li>


            <li style={{ display: role === 'admin' ? '' : 'none' }} className='nav-item'>
              <a className={window.location.pathname === '/students_list' ? "active fw-medium nav-link " : "fw-medium nav-link"}href="/students_list" >
                Students
              </a>
            </li>
            <li style={{ display: role === 'admin' ? '' : 'none' }} className='nav-item'>
              <a className={window.location.pathname === '/employers_list' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/employers_list" >
                Employers
              </a>
            </li>
            <li style={{display:role==='Job Seeker'?"":'none'}} className='nav-item'>
                                <a  className={window.location.pathname === '/applied_jobs' ? "active fw-medium nav-link " : "fw-medium nav-link"} href='/applied_jobs'>My Applications</a>
                            </li>
           
            <li className="nav-item">
          <a style={{display:role==='employer'?"":'none'}} className={window.location.pathname === '/job_applications' ? "active fw-medium nav-link " : "fw-medium nav-link"}  href="/job_applications">My Jobs</a>
        </li>
        <li style={{display:role==='employer'?"":'none'}} className="nav-item">

          <a className={window.location.pathname === '/employer' ? "active fw-medium nav-link " : "fw-medium nav-link"} href='/post_job'>Post a job</a>
        </li>
        <li style={{display:role==='admin'?"":'none'}} className='nav-item'>
              <a className={window.location.pathname === '/messages_page' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/messages_page">Messages</a>
            </li>
            
        <li style={{display:username && role!=='admin'?"":'none'}} className='nav-item'>
              <a className={window.location.pathname === '/user_messages' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/user_messages">Messages</a>
            </li>
            
{/* add a dropdown here  */}
            <div className='dropdown'>
            <li className='nav-item'>
              <a  onClick={updateNotifications} style={{ display: username && role !== 'admin' ? '' : 'none' }} role="button" data-bs-toggle="dropdown" aria-expanded="false" className={window.location.pathname === '/#notifications' ? "active fw-medium nav-link " : "fw-medium nav-link "} href="#notifications" >
              <Badge badgeContent={unRead} color="warning" >
              <NotificationsIcon color='light' style={{fontSize:"large"}}/>
              </Badge>
              </a>
              <ul className="dropdown-menu notifications">
                                {notifications.length === 0 ? (
      <li className="">No notifications</li>
    ) : (
      notifications.map((notification) => (
        <li key={notification.notification_id} style={{fontSize:'small'}} >
          {notification.content} {/* Assuming notifications have a title property */}
          <hr/>
        </li>
      ))
    )}
                                </ul>
            </li>
            </div>
            <li className='nav-item'>
              <a style={{ display: role === 'admin' ? '' : 'none' }} className={window.location.pathname === '/admin_notifications' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/admin_notifications" >
                Notifications
              </a>
            </li>
            <li className="nav-item px-2 " style={{ display: username ? 'none' : '' }} >
              <a className={window.location.pathname === '/login' ? "active fw-medium nav-link " : "fw-medium nav-link"} href='/login'>Sign in </a>

            </li>
            <li className="nav-item px-2 " style={{ display: username ? 'none' : '' }}>
              <a className={window.location.pathname === '/signup' ? "active fw-medium nav-link " : "fw-medium nav-link"} href='/signup'>Signup</a>
            </li>
            <li style={{display:username?'':'none'}} className="nav-item px-2 " ><a className={window.location.pathname === '/#' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="#" onClick={handleLogout}>Logout </a>
            </li>
            <li className='nav-item px-2'>
              <a className={window.location.pathname === '/profile'||window.location.pathname ==='/employer_profile'||window.location.pathname ==='/jobseeker_profile' ? "active fw-medium nav-link " : "fw-medium nav-link"} href={role === 'student' ? '/profile' : role === 'employer' ? '/employer_profile' : role === 'Job Seeker' ? '/jobseeker_profile' : ''}>
                <span> {username && username} </span>
                <span style={{ fontSize: '10px' }}>{username && ('(' + role + ')')}</span>

              </a>


            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}