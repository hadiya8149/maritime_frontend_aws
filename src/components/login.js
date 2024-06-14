import React, { useState, useEffect } from 'react';
import '../css/login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { API_URL } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Air } from '@mui/icons-material';

//API.get
export default function Login() {

  // const myAPI = 'getUsers'
  // const path = '/api/users'
  // const endpoint = 'https://sy0za5fgni.execute-api.ap-southeast-2.amazonaws.com/main'
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user_id, setUser_id] = useState('')
  const [flag, setFlag] = useState(false)
  function handlePassword(val) {
    setPassword(val.target.value)
  }
  function handleEmail(val) {
    setEmail(val.target.value)
  }
  async function handleSubmit(event) {
    setFlag(true)
    event.preventDefault()

    var requestOptions = {
      email: email,
      password: password,
      redirect: 'follow',
      withCredentials: true
    };
    // const res = await axios.post(`${API_URL}/login`)
    // console.log(res)
    try {
      await axios.post(`${API_URL}/login`, requestOptions).then(
        (data) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(data)
              // change the backend to give consistent status and data message response
              if (data['status'] == 200) {
                const role = data['data'].user_role
                console.log(role)
                localStorage.setItem('authToken', data.data.token);
                localStorage.setItem('role', role);
                localStorage.setItem('user_id', data.data.user_id)
                localStorage.setItem('username', data.data.username)
                const token = localStorage.getItem('authToken')

                const myHeaders = new Headers()
                myHeaders.append("Authorization", `Bearer ${token}`)
                setUser_id(data.data.user_id)
                if (data.data.user_role.toLowerCase() === 'student') {

                  navigate('/student', { replace: true })
                }
                else if (data.data.user_role.toLowerCase() == 'employer') {
                  navigate('/employer')
                }
                else if (data.data.user_role == 'Job Seeker') {
                  const user_id = localStorage.getItem('user_id')

                  navigate('/jobseeker')

                }

                else if (data.data.user_role == 'admin') {
                  navigate('/admin')
                }
              }

              else {
                setFlag(false)
              }
            }
              , 1);
          }),

      ).catch(function (error) {
        if (error.response.status == 401) {
          toast.error("Invalid password. Please try again")
          setFlag(false)
        }
        else if (error.response.status == 404) {
          toast.error("user not found . Please signup")
        }
      })

    }
    catch (err) {
      console.log(err)
    }
  }
  // async function getUsers(e) {
  //   await API.get('backendrestapi', '/api/users')
  // }
  useEffect(() => {
    const user_id = localStorage.getItem('user_id')
    if (user_id) {
      navigate('/')
    }
    // getUsers()

  })

  return (

    <div id="bannerImage" style={{ width: '100%' }}>
      <div className='container'>
        <ToastContainer />

        <div className='m-auto form-container'>
          <div className='card w-50 h-50' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h3 id="form-heading" style={{ textAlign: 'center', marginTop: '10%' }}>Login</h3>

            <form id='loginForm' className='m-auto w-75 text-center' onSubmit={handleSubmit} style={{backgroundColor:'none'}} >
              <div className="mb-3">
                <input placeholder='Enter email' type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" onChange={handleEmail} />
              </div>
              <div className="mb-3">
                <input placeholder='enter password' type="password" className="form-control" id="InputPassword" onChange={handlePassword} />
              </div>
              <div className="mb-3 ">
                <a className='link-primary' href='/signup'>Don't have account? Signup Here</a>
                <br />
                <a  className='link-primary' href='/forgot_password' >Forgot Password?</a>
              </div>


              <button type="submit" className="btn btn-primary" disabled={flag} >Submit</button>
              {flag && (
                <button class="btn " type="button" disabled={!flag}>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              )}

            </form>
          </div>
        </div>



      </div>
      {/* add footer here */}
    </div>
  )
}