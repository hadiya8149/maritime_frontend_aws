import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './admin_navbar';
export default function StudentsList() {
    const [users, setUsers] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/students');
            if (response.status === 200) {
                setUsers(response.data.data);
                console.log(response)
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
            const url = 'http://localhost:8000/api/delete_student/' + userID;
            const response = await axios.delete(url);
            if (response.status === 200) {
                // setUsers((prevUsers) => prevUsers.filter((user) => user.std_id !== user.std_id)); // Filter out deleted applicant
                alert("Student delete successfully")
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
<div className=''>
<AdminNavbar/>

<div className='container m-auto mt-5'>
            <h2 style={{ textAlign: 'center' }}> Student Management</h2>
            
            <div className='row row-cols-1 row-cols-md-3 g-4'>

                {users.map(user=>{
                        const userID = user.user_id;
                        return(
                            <div className='col'>
                        <div className="card mb-3 text-left  m-auto" id = {user.user_id}>
                        <div className="card-header">
                            {user.studentName}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Personal Details</h5>
                            <p className="card-text"><span style={{fontWeight:'bold'}}>StudentID</span> {user.studentIDNumber}</p>
                            <p className="card-text"><span style={{fontWeight:'bold'}}>First Name</span> {user.first_name},Last Name {user.last_name}</p>

                            <p className="card-text"><span style={{fontWeight:'bold'}}>Contact no.</span> {user.contact_no}</p>
                            <p className="card-text"><span style={{fontWeight:'bold'}}>Gender</span> {user.gender}</p>
                            <p className="card-text"><span style={{fontWeight:'bold'}}>Address</span> {user.address}</p>
                            
                            <a href="#" id = {user.user_id} className="btn btn-danger" onClick={() => deleteUser(user.std_id)} >Delete Student</a>
                        </div>
                    </div>
                    </div>
                    )
})}
           
            </div>

        </div>
</div>
    )
}