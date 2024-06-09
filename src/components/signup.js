import { useNavigate } from "react-router-dom"
import '../css/home.css'
import { useState } from "react";
import axios from 'axios';
import React from 'react'
import { API_URL } from '../utils.js';
import '../css/signup.css'

export default function Signup() {
    const [signupForm, setsignupForm] = useState({
        username: "",
        email: "",
        password: "",
        password1: '',
        role: '',
        age: 0,
        gender: '',
    })
    function handleChange(e) {
        const { name, value } = e.target;
        setsignupForm(prevData => ({
            ...prevData, [name]: value
        }))
    }
    function isValidEmail() {
        return /\S+@\S+\.\S+/.test(signupForm.email);

    }
    function isValidPassword() {
        const isPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/.test(signupForm.password);
        const isPassword2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/.test(signupForm.password1);
        if (isPassword !== isPassword2) {
            alert("Passwords donot match");

        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const { password1, ...body } = signupForm;
        console.log(body)
        const response = await axios.post(`${API_URL}/create_user`, body).then(
            (data) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(data)
                        if (data['status'] === 201) {
                            console.log(data)
                            alert("user signed up successfully")
                            
                        }
                    }, 1);
                }),

        ).catch(function (error) {
            console.log(error)
        })
        alert("user signed up")
    }


    return (
        <div id="bannerImage">
            <div className='container signupform-container'>
                <div className='m-auto form-container'>
                    <div className=" w-100 signupcard" style={{ background: 'none', border: 'none' }}>
                        <form onSubmit={handleSubmit} id="signupform" className=" m-auto p-5" style={{ color: 'black' }}>
                        <span id="create-account"><h4 style={{textAlign:'center'}}>Create Account</h4></span>

                            <div className="mb-3 group " >
                             
                                <input type="email" placeholder="Email Address" className="form-control mr-3 " onChange={handleChange} name='email' id="InputEmail" aria-describedby="emailHelp" required />
                           
                                <input type="text" placeholder="User Name" className="form-control mr-3 " onChange={handleChange} id="InputUserName" name='username' aria-describedby="UserNameHelp" required/>
                            </div>
                            <div className="mb-3">
                                <input type="password" placeholder="password" className="form-control mb-3" onChange={handleChange} id="InputPassword" name='password' required/>
                                <input type="password" placeholder="Re enter password" className="form-control" onChange={handleChange} name='password1' id="InputPassword1" required/>

                            </div>
                            <div className="mb-3 group">
                                <input type="number" placeholder="age" className="form-control mr-3" id="InputAge" name='age' onChange={handleChange} aria-describedby="AgeHelp" min='18'required and max='70' />
                                <select onChange={handleChange} className="w-100 mr-3" name='gender' required>
                                    <option>Gender</option>
                                    <option >Female</option>
                                    <option>Male</option>
                                    <option>Others</option>
                                </select>
                                <select onChange={handleChange} htmlFor='role' className="w-100 mr-3" name='role' required>
                                    <option>Role</option>
                                    <option>
                                        Student
                                    </option>
                                    <option>
                                        Employer
                                    </option>
                                    <option>Job Seeker</option>
                                </select>
                            </div>
                            <button id='signupbtn' type="submit" className="btn btn-primary signup-btn btn-lg " style={{heihgt:'50px'}}>Signup</button>
                        </form>
                    </div>

                </div>

            </div>

        </div>

    )
}