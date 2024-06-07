import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css'
export default function Navbar() {
  const [activeLink, setActiveLink] = useState('');
const navigate = useNavigate()
  const username=localStorage.getItem('username')
  const role = localStorage.getItem('role')
  function handleLogout(){
    localStorage.clear();
    navigate('/')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 backdrop mb-3" data-navbar-on-scroll="data-navbar-on-scroll" style={{ background: 'rgb(7 48 91)' }}>
      <div className="container-fluid"><a className="navbar-brand d-flex align-items-center fw-bolder fs-2 fst-italic" href="/">
        <div className="text-info">Mari</div>
        <div className="text-warning">Time</div>
      </a>
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" style={{ marginRight: '10%' }} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto pt-2 pt-lg-0">
            <li className="nav-item px-2"><a className="fw-medium " aria-current="page" href="/">Home</a></li>
            <div className="dropdown">

              <a className="fw-medium" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Jobs</a>
              <ul className="dropdown-menu jobs-submenu">
                <li><a className="dropdown-item link-dark" href="/jobs">View Jobs</a></li>
                <li><a className="dropdown-item link-dark" href="/jobseeker">Candidates</a></li>
                <li><a className="dropdown-item link-dark" href="/employer">Employers</a></li>
              </ul>
            </div>
            <li className="nav-item px-2"><a className="fw-medium" href="/courses_list">Courses</a></li>
            <li className="nav-item px-2"><a className="fw-medium" href="/programs">Training Programs</a></li>
            <li className="nav-item px-2"><a className="fw-medium" href="/student">Student Portal</a></li>

            <li className="nav-item px-2">
              <div className='dropdown'>
                <a href='/login' role='button' data-bs-toggle='dropdown' aria-expanded='false'>

Account
                </a>
                <ul className='dropdown-menu' style={{ left: '0', width:"60px"}}>
                  <li>
                    <a className='dropdown-item link-dark' href='/login'>Sign in </a>
<hr/>
                  </li>

                  <li><a className='dropdown-item link-dark' href="#" onClick={handleLogout}>Logout </a>
                  <hr/></li>
                  <li><a className='dropdown-item link-dark' href='/signup'>Signup</a>

                  </li>

                </ul>
              </div>

            </li>

            <li className='nav-item px-2'>
            <div className='dropdown'>
            <a className='fw-medium ' role='button' data-bs-toggle='dropdown' aria-expanded='false' href="#">
                  <span>{username && username}</span>
                  </a>
<ul className='dropdown-menu' style={{height:'55px'}}>
                  <h6>{username && role}</h6>
                  <li className='dropdown-item'></li>  
  </ul>                  

            </div>
            
              </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}