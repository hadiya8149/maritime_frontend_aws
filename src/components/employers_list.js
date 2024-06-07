import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './admin_navbar';


export default function EmployersList() {
    
    const [users, setUsers] = useState([])
    
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/employers');
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
            const url = 'http://localhost:8000/api/delete_user/' + userID;
            const response = await axios.delete(url);
            if (response.status === 200) {
                fetchData(); // Update users list after deletion
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
<div>
<AdminNavbar/>
        <div className='container m-auto mt-5 align-item-center'>
            <h2 style={{ textAlign: 'center' }}> Employers Management</h2>
            <div>
      <div className='row row-cols-1 row-cols-md-3 g-4'>

                {users.map(user=>{
                        const userID = user.user_id;
                        return(
                            <div className='col'>
                        <div className="card mb-3 " id = {user.user_id}>
                        <div className="card-header">
                            {user.username}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Personal Details</h5>
                            <h6 className=""><span style={{fontWeight:'bold'}}>Email</span> {user.email}</h6>
                            <h6 className=""><span style={{fontWeight:'bold'}}>Company </span> {user.company_name}</h6>
                            <h6 className=""><span style={{fontWeight:'bold'}}>Company emai</span> {user.contact_email}</h6>
                            <h6 className=""><span style={{fontWeight:'bold'}}>Website</span> {user.company_website}</h6>
                            <h6 className=""><span style={{fontWeight:'bold'}}>Company size</span> {user.company_size}</h6>
                            <h6 className=""><span style={{fontWeight:'bold'}}>Location</span> {user.location}</h6>
                            <h6 className=""><span style={{fontWeight:'bold'}}>Description</span>{user.description}</h6>


                            
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