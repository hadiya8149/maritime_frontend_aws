
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './admin_navbar';
import '../css/admin.css'
import { API_URL } from '../utils';
export default function EmployersList() {
    
    const [users, setUsers] = useState([])
    const token = localStorage.getItem("authToken")
    const myHeaders = new Headers()

   useEffect(()=>{
    myHeaders.append('Authorization', `Bearer ${token}`)

   })
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/employers`, {headers:myHeaders});
            if (response.status === 200) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    async function deleteUser(userID) {
        try {
            const url = `${API_URL}/delete_user/` + userID;
            const response = await axios.delete(url, {headers:myHeaders});
            if (response.status === 200) {
                fetchData(); // Update users list after deletion
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
<div style={{minHeight:'100vh'}}>
<AdminNavbar/>
        <div className='container m-auto mt-5 align-item-center'>
            <h2 style={{ textAlign: 'center' }}> Employers Management</h2>
            <div>
      <div className='row row-cols-1 row-cols-md-3 g-4' id="empls_row">

                {users.map(user=>{
                        const userID = user.user_id;
                        return(
                            <div className='col' id="empls">
                        <div className="card mb-3 " id="#employerCard">
                        <div className="card-header">
                            {user.username}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Details</h5>
                            <p className='text-left'><span style={{fontWeight:'bold'}}>Email</span>{user.email}</p>
                            <p className='text-left'> <span style={{fontWeight:'bold'}}>Company</span>{user.company_name}</p>
                            <p className='text-left'> <span style={{fontWeight:'bold'}}>Company email</span> {user.contact_email}</p>
                            <p className='text-left'> <span style={{fontWeight:'bold'}}>Website </span>{user.company_website}</p>
                            <p className='text-left'> <span style={{fontWeight:'bold'}}>Company size</span> {user.company_size}</p>
                            <p className='text-left'> <span style={{fontWeight:'bold'}}>Location</span> {user.location}</p>
                            <p className='text-left'> <span style={{fontWeight:'bold'}}>Description</span>{user.description}</p>


                            
                            <a href="#delete" id = {user.user_id} className="btn btn-danger" onClick={() => deleteUser(userID)} >Delete User</a>
                        </div>
                    </div>
                    </div>
                    )
})}
           </div>
            </div>

        </div>
</div>
 
    )
}