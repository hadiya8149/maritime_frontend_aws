import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css'
export default function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  function handleLogout() {
    localStorage.clear();
    navigate('/')
    const token = localStorage.getItem('authToken')

  }
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

            <li style={{ display: role === 'admin' ? '' : role === 'employer' ? '' : role === 'Job Seeker' ? '' : 'none' }}>
              <a className={window.location.pathname === '/jobs' ? "active fw-medium nav-link" : "fw-medium nav-link"} href={role === 'admin' ? 'manage_jobs' : '/jobs'}>Jobs</a>
            </li>


            <li style={{ display: role === 'admin' ? 'none' : !username || role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/courses_list' ? "active fw-medium nav-link" : "fw-medium  nav-link "} href="/courses_list">Courses</a></li>
            <li style={{ display: role === 'admin' ? 'none' : !username || role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/programs' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/programs">Training Programs</a></li>
            <li style={{ display: role === 'admin' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/programs' ? "active fw-medium nav-link " : "fw-medium nav-link"} href="/programs&courses_management"> Courses and programs</a></li>
            <li style={{ display: role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/student' ? "active fw-medium nav-link " : "fw-medium nav-link "} href="/student">Student Portal</a></li>
            <li style={{ display: role === 'student' ? '' : 'none' }} className="nav-item px-2"><a className={window.location.pathname === '/student' ? "active fw-medium nav-link " : "fw-medium nav-link "} href="/my_course&programs">My Courses & programs</a></li>


            <li style={{ display: role === 'admin' ? '' : 'none' }} className='nav-item'>
              <a className="nav-link" href="/students_list" >
                Students
              </a>
            </li>
            <li style={{ display: role === 'admin' ? '' : 'none' }} className='nav-item'>
              <a className="nav-link" href="/employers_list" >
                Employers
              </a>
            </li>
            <li style={{display:role==='Job Seeker'?"":'none'}} className="nav-item">
                                <a className="nav-link" href='/applied_jobs'>My Applications</a>
                            </li>
           
            <li className="nav-item">
          <a style={{display:role==='employer'?"":'none'}} className="nav-link"  href="/job_applications">My Jobs</a>
        </li>
        <li style={{display:role==='employer'?"":'none'}} className="nav-item">
          <a className="nav-link" href="/employer" >Post a job</a>
        </li>
        <li style={{display:username?"":'none'}} className='nav-item'>
              <a className="nav-link " href="/messages_page">Inbox</a>
            </li>
            <li className='nav-item'>
              <a style={{ display: username && role !== 'admin' ? '' : 'none' }} className="nav-link" href="/notifications" >
                Notifications
              </a>
            </li>
            <li className='nav-item'>
              <a style={{ display: role === 'admin' ? '' : 'none' }} className="nav-link" href="/admin_notifications" >
                Notifications
              </a>
            </li>
            <li className="nav-item px-2 " style={{ display: username ? 'none' : '' }} >
              <a className='fw-medium nav-link' href='/login'>Sign in </a>

            </li>
            <li className="nav-item px-2 " style={{ display: username ? 'none' : '' }}>
              <a className='fw-medium nav-link' href='/signup'>Signup</a>
            </li>
            <li style={{display:username?'':'none'}} className="nav-item px-2 " ><a className='fw-medium nav-link' href="#" onClick={handleLogout}>Logout </a>
            </li>
            <li className='nav-item px-2'>
              <a className='fw-medium nav-link' href={role === 'student' ? '/profile' : role === 'employer' ? '/employer_profile' : role === 'Job Seeker' ? '/jobseeker_profile' : ''}>
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