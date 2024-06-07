import '../css/profile.css'
import profile_image from '../assets/profile-icon-design-free-vector.jpg'
import { useState, useEffect} from 'react'
import axios from 'axios'
import React from 'react'
import { useCallback } from 'react'


export default function Profile() {
    const [progress, setProgress]=useState([])
    const [profile, setProfile]=useState([])
    const std_id = localStorage.getItem('std_id')
    const [editProfile, setEditProfile]=useState({
      studentName:'',
      first_name:'',
      last_name:'',
      contact_no:'',
      address:''
    })
    
    const fetchProfile = useCallback(async () => {
    
      try {
            const response = await axios.get('http://localhost:8000/api/student/'+std_id);
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
            const response = await axios.get('http://localhost:8000/api/progress/'+std_id);
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
      setEditProfile(prevData => ({
          ...prevData, [name]: value
      }));
      console.log(editProfile

      )
    }
    async function handleSubmit(e){
      console.log(editProfile)
      await axios.put('http://localhost:8000/api/update_student/'+std_id, {editProfile}).then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }
  useEffect(() => {
    fetchProfile();
    fetchProgress();
}, []);
    return (
<>
<nav className="navbar navbar-expand-lg bg-body-tertiary" style={{marginTop:'5%'}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="/student">Home</a>
        </li>
     
        <li className="nav-item">
          <a className="nav-link" href="/my_course&programs">My Courses and Programs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile">Profile</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
            <div className="container mt-5 mb-10 m-auto d-flex">

                <div className="left-side mr-3">
                    <div className="card mb-3" style={{ width: '300px', height: '' }}>
                    <img src={profile_image} style={{ height: '100px', width: '100px' }} className="card-img-top m-auto" alt="..."></img>

                        <div className="card-body text-left">
                        <h5 className="card-title">Personal Details</h5>

                            <h6>{profile.studentName}</h6>
                            <h6>Student ID: {profile.studentIDNumber}</h6>
                            <h6>First Name: {profile.first_name}</h6>
                            <h6>Last Name: {profile.last_name}</h6>

                 
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
        <form className='m-auto w-100' onSubmit={()=>handleSubmit()}>
        <div>       
            <label htmlFor='#firstName'>First Name</label>
            <input className='ml-5' type='text' name='first_name' id='firstName' />
            </div>
            <div>       
            <label htmlFor='#lastName'>Last Name</label>
            <input   className='ml-5' name='last_name' onChange={handleChange}  type='text' id='LastName' />
            </div>
            <div>       
            <label htmlFor='#studentName'>Student Name</label>
            <input type='text' id='StudentName'  name='studentName' onChange={handleChange}/>
            </div>
           <div>       
            <label htmlFor='#editNumber'>Contact No. </label>
            <input  className='ml-5'  name='contact_no' onChange={handleChange} type='number' id='editNumber' />
            </div>
<div>
            <label htmlFor='#editAddress'>Address</label>
            <input name='address'onChange={handleChange}  className='ml-5'  id='editAddress' type='text'/>
            </div>
<hr/>
        <button type="button" className="btn bg-secondary" style={{color:'white'}} data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn bg-primary"  style={{color:'white'}}>Save changes</button>

        </form>
      </div>

    </div>
  </div>
</div>
                </div>
                <div className="right-side ml-3 ">
                    <div><h4>Progress</h4>
                    Track your courses and programs progress here

                            <div className='mb-3'>
<table className='table  m-auto'>
  <thead>
    <tr>
      <th>Course id</th>
      <th>Program Id</th>
      <th>Progress</th>
      <th>Completion Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {progress && progress.map((prog)=>{
      return(
      <tr key={prog.ProgressID}>
  <td>{prog.CourseID}</td>

  <td>
      {prog.ProgramID}
  </td>
  <td>
      {prog.CompletionStatus}
  </td>
  <td>
      {prog.LastUpdatedDate}
  </td>
</tr>
      )
    })}


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