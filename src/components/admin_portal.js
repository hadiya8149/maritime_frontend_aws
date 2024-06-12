import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage(){
    const navigate=useNavigate();
    
    const role = localStorage.getItem('role');
    useEffect(()=>{
        if (role !=='admin'){
            navigate('/')
        }
    })
    
    return (
<div style={{minHeight:'100vh'}}>
<div>
    <h2>Welcome to Admin Portal</h2>
   <div>
   </div>
   <ToastContainer/>
</div>
</div>
)   
}