import '../css/profile.css'
import profile_image from '../assets/profile-icon-design-free-vector.jpg'
import { useState, useEffect} from 'react'
import axios from 'axios'
import React from 'react'
import qs from 'qs'
import { useCallback } from 'react'

import { API_URL } from '../utils.js';

export default function Profile() {
    const [progress, setProgress]=useState([])
    const [profile, setProfile]=useState([])
    const std_id = localStorage.getItem('std_id')
    const token = localStorage.getItem('authToken')

    const [editProfile, setEditProfile]=useState({
      studentName:'',
      first_name:'',
      last_name:'',
      contact_no:'',
      address:''
    })
    const myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${token}`)
    // fix response data from get student by user id
    const fetchProfile = useCallback(async () => {
      
      try {
            const response = await axios.get(`${API_URL}/student/${std_id}`, {headers:myHeaders});
            if (response.status === 200) {
                console.log(response) 
              setProfile(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
        
    }, [std_id]);
    const fetchProgress = async () => {
        try {
            const response = await axios.get(`${API_URL}/progress/${std_id}`,{headers:myHeaders});
            if (response.status === 200) {
              console.log(response.data.data)
              setProgress(response.data.data)
              console.log(progress)
            }
        } catch (error) {
            console.error(error);
        }
    };
    function handleChange(e){
      const { name, value } = e.target;
      console.log(name, value)
      console.log("name, value")
      setEditProfile(prevData => ({
          ...prevData, [name]: value
      }));
      console.log(editProfile)
    }

    async function handleSubmit(e){
      let data = qs.stringify(editProfile);
  
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL}/update_student/${std_id}`,
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data : data
      };
      
      await axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
  useEffect(() => {
    fetchProfile();
    fetchProgress();
}, []);
    return (
<>

            <div className="container mt-5 mb-10 m-auto d-flex">

                <div className="left-side mr-3">
                    <div className="card mb-3" style={{ width: '300px', height: '' }}>
                    <img src={profile_image} style={{ height: '100px', width: '100px' }} className="card-img-top m-auto" alt="..."></img>

                        <div className="card-body text-left">
                        <h5 className="card-title">Personal Details</h5>

                            <p>{profile.studentName}</p>
                            <p>Student ID: {profile.studentIDNumber}</p>
                            <p>First Name: {profile.first_name}</p>
                            <p>Last Name: {profile.last_name}</p>

                 
                            <p className="card-text">Gender: {profile.gender}</p>
                            <h5>Contact details</h5>
                            <p><span style={{display: 'block'}}>Address: {profile.address}</span><span>Contact No: {profile.contact_no}</span></p>
                            <a   href="#editContactDetails" data-bs-toggle="modal" data-target="#editContactDetails"  className='btn btn-primary'>Edit</a>

                        </div>
                    </div>
                    <div className="modal fade" id="editContactDetails" tabIndex="-1" aria-labelledby="editContactModal" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit contact Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className='m-auto w-100' onSubmit={handleSubmit}>
        <div className='row mb-3'>       
            <label className='col-sm-4 col-form-label' htmlFor='first_name'>First Name</label>
            
            <input type="text" onChange={handleChange} id="first_name" className='col-sm-8' name="first_name" defaultValue={profile.first_name} />

            
            </div>
            <div className='row mb-3'>       
            <label className='col-sm-4 col-form-label'  htmlFor='last_name'>Last Name</label>
            <input   className='col-sm-8' name='last_name' defaultValue={profile.last_name}   onChange={handleChange}  type='text' id='last_name' />
            </div>
            <div className='row mb-3'>       
            <label className='col-sm-4 col-form-label' htmlFor='studentName'>Full Name</label>
            <input type='text' id='studentName' className='col-sm-8' defaultValue={profile.studentName}   name='studentName' onChange={handleChange}/>
            </div>
           <div className='row mb-3'>       
            <label className='col-sm-4 col-form-label'  htmlFor='contact_no'>Contact No. </label>
            <input  className='col-sm-8'  name='contact_no' defaultValue={profile.contact_no}  onChange={handleChange} type='tel' id='contact_no' />
            </div>
<div className='row mb-3'>
            <label className='col-sm-4 col-form-label' htmlFor='address'>Address</label>
            <input name='address'onChange={handleChange} defaultValue={profile.address}  className='col-sm-8'  id='address' type='text'/>
            </div>
<hr/>
        <button type="button" className="btn bg-secondary " style={{color:'white', marginRight:'16px'}} data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn bg-primary  "  style={{color:'white'}}>Save changes</button>

        </form>
      </div>

    </div>
  </div>
</div>
                </div>
                <div className='table-container col'>
                    <div><h4>Progress</h4>
                    Track your courses and programs progress here

  
                            <div className='mb-3'>
<table className='table' id='progressTable'>
  <thead>
    <tr  className='table-info' >
      <th scope='col' className='pt-th'>Course id</th>
      <th scope='col' className='pt-th' >Program Id</th>
      <th scope='col' className='pt-th'>CompletionStatus</th>
      <th scope='col' className='pt-th'>Date</th>
    </tr>
  </thead>
  <tbody>
  {progress ? (
  progress.length > 0 ? (
    progress.map((prog) => (
      <tr key={prog.ProgressID}>
        <td className='pt-cell' scope='col'>{prog.CourseID}</td>
        <td className='pt-cell' scope='col'>{prog.ProgramID}</td>
        <td className='pt-cell' scope='col'>{prog.CompletionStatus}</td>
        <td className='pt-cell' scope='col'><time>{prog.LastUpdatedDate.toLocaleString().slice(0,19).replace('T', ' ')}</time></td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No progress made yet. Courses or programs you have completed will appear here.</td>
    </tr>
  )
) : (
  <tr>
    <td colSpan="4">No progress data available.</td>
  </tr>
)}

  </tbody>
</table>

                            </div>
                    </div>
                    {/* <div>
                        <h4> Education </h4>
                        <div className='EP12'>
                            <h6>Certifications & licenses</h6>
                            <h6>Degrees</h6>
                        </div>
                    </div> */}
                
                </div>
            </div>
            </>
    )
}