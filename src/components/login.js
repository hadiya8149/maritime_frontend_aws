
import React, { useState, useEffect } from 'react';
import '../css/login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { API_URL } from '../utils';


export  const Login=()=> {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user_id, setUser_id]=useState('')
  function handlePassword(val) {
    setPassword(val.target.value)
  }
  function handleEmail(val) {
    setEmail(val.target.value)
  }
  async function handleSubmit(event) {

    event.preventDefault()

    var requestOptions = {
      method: 'POST',
        email:email,
        password:password,
      redirect: 'follow',
      withCredentials:true
    };
    try{
    await axios.post(`${API_URL}/login`,requestOptions).then(
      (data)=>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(data)
                // change the backend to give consistent status and data message response
                if(data.data.succes===true){
                const role = data['data'].user_role
                console.log(role)
                localStorage.setItem('authToken', data.data.token);
                localStorage.setItem('role', role);
                localStorage.setItem('user_id', data.data.user_id)
                localStorage.setItem('username', data.data.username)
                setUser_id(data.data.user_id)
                 if(data.data.user_role.toLowerCase() ==='student') {
                  navigate('/student', {replace:true})
                 }
                 else if (data.data.user_role.toLowerCase()=='employer'){
                  navigate('/employer')
                 }
                 else if (data.data.user_role=='Job Seeker'){
                  const user_id = localStorage.getItem('user_id')
                  const fetchJobSeekerID = async()=>{
                    const response = await axios.get(`${API_URL}/jobseeker_by_user_id/`+user_id)
                    if (response.status===200){
                      localStorage.setItem('jobSeeker_id', response.data.data.jobSeeker_id);
                      navigate('/jobseeker')

                    }
                  }
                  
                  fetchJobSeekerID()
                 }
                 else if (data.data.user_role=='admin'){
                  navigate('/admin')
                 }
              }
            }, 1);
          }),
    
    ).catch(function(error){
      if (error.response.status==401){
        alert("Invalid password. Please try again")
      }
      else if (error.response.status==404){
        alert("user not found . Please signup")
      }
    })
    
  }
  catch(err){
    console.log(err)
  }
}
  
      

  useEffect(()=>{
    const user_id = localStorage.getItem('user_id')
    if (user_id){
      navigate('/')
    }
  })
  return (
    <div id="bannerImage" style={{width:'100%'}}>
    <div className='container'>

      <div className='m-auto form-container'>
        <div className='card w-50 h-50'style={{background:'none', border:'none'}}>
        <form id='loginForm' className='m-auto w-75' onSubmit={handleSubmit} >
          <span id="form-heading">Login</span>
          <div className="mb-3">
            <input placeholder='Enter email' type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" onChange={handleEmail} />
          </div>
          <div className="mb-3">
            <input placeholder='enter password' type="password" className="form-control" id="InputPassword" onChange={handlePassword} />
          </div>
          <div className="mb-3 ">
            <a className='link-primary' href='/signup'>Don't have account? Signup Here</a>
            <br />
            <a  className='link-primary' href='reset_password'>Reset password</a>
          </div>
          <button type="submit" className="btn btn-primary"  >Submit</button>
        </form>
        </div>
      </div>

    </div>
  {/* add footer here */}
    </div>
  )
}