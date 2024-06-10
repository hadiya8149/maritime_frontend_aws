import React, { useEffect } from 'react'
import AdminNavbar from './admin_navbar';
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage(){
    const navigate=useNavigate();
    
    const role = localStorage.getItem('role');
    useEffect(()=>{
        if (role !=='admin'){
            navigate('/')
            toast.warning('unauthorized access')
        }
    })
    
    return (
<div style={{minHeight:'100vh'}}>
<AdminNavbar/>
<div>
    <h2>Welcome to Admin Portal</h2>
   <div>
   </div>
   <ToastContainer/>
</div>
</div>
)   
}