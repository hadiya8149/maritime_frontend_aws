
import 'react-toastify/dist/ReactToastify.css';
import '../css/signup.css'
import '../css/home.css'
import React, { useEffect } from "react";
import axios from 'axios'
import { API_URL } from "../utils";
import {toast, ToastContainer} from 'react-toastify'
import { useState } from "react";
import { json, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
    const navigate=useNavigate()
    const [email, setEmail ]=useState("")
    const [resetForm, setResetForm] = useState({
        email: email,
        password: "",
        password1: '',
    })
    const [token, setToken]=useState('')

useEffect(()=>{
    setToken(window.location.search.slice(7))
},[])    
    function handleChange(e) {
        const { name, value } = e.target;
        setResetForm(prevData => ({
            ...prevData, [name]: value
        }))
    }
 async function handleSubmit(e){
    
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = searchParams.get('token');
    console.log(tokenFromUrl)
    console.log(resetForm)
    if(resetForm.password===resetForm.password1){
        const data = {
            email:resetForm.email,
            password:resetForm.password
        }
        const response = await axios.put(`${API_URL}/update_password`, data, {headers:{'Authorization':`Bearer ${tokenFromUrl}`}})
        console.log(response)
        if(response.status===200){
            toast.success('Password reset successfully')
            navigate('/login')
        }
        else{
            toast.warning("Could not update your password")
        }
    }
    else{
        toast.error("Passwords do not match")
    }
 }
 function decodeJWT(jwt_token) {
    const parts = jwt_token.split('.');
    if (parts.length !== 3) {
      console.error("invalid json webtoken")
    }
    else{
        const decodedHeader = JSON.parse(atob(parts[0]));
        const decodedPayload = JSON.parse(atob(parts[1].replace('-', '+').replace('_', '/')));
        console.log(decodedHeader, decodedPayload )
        return decodedPayload.email
    
    }
  }
  useEffect(()=>{
    console.log(token)
    setEmail(decodeJWT(token))
  },[email])
    return (
        <div id="bannerImage" style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <ToastContainer position='top-center'/>
            <div className='container signupform-container'>
                <div className='m-auto form-container'>
                    <div className=" w-100 signupcard" style={{ background: 'none', border: 'none' }}>
                        <form onSubmit={handleSubmit} id="signupform" className=" m-auto p-5" style={{ color: 'black' }}>
                        <span id="create-account"><h4 style={{textAlign:'center'}}>Create New Password</h4></span>

                            <div className="mb-3 group " >
                             
                                <input type="email" placeholder="Email Address" className="form-control mr-3 " value={email} name='email' id="InputEmail" aria-describedby="emailHelp" readOnly disabled={true} />
                           
                            </div>
                            <div className="mb-3">
                                <input type="password" placeholder="password" className="form-control mb-3" onChange={handleChange} id="InputPassword" name='password' required/>
                                <input type="password" placeholder="Re enter password" className="form-control" onChange={handleChange} name='password1' id="InputPassword1" required/>

                            </div>
                            
                            <button id='signupbtn' type="submit" className="btn btn-primary signup-btn btn-lg " style={{heihgt:'50px'}}>Reset</button>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
  }