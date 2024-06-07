import React, { useEffect } from 'react'
import AdminNavbar from './admin_navbar';
import { useNavigate } from 'react-router-dom'
export default function AdminPage(){
    const navigate=useNavigate();
    
    const role = localStorage.getItem('role');
    useEffect(()=>{
        if (role !=='admin'){
            navigate('/')
            alert("Unauthorized access")
        }
    })
    
    return (
<div className='h-100'>
<AdminNavbar/>
<div>
    <h2>Welcome to Admin Portal</h2>
   <div>
   </div>
</div>
</div>
)   
}