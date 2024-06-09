import '../css/profile.css'
import msg_icon from '../assets/icons8-message-50.png'

import profile_image from '../assets/profile-icon-design-free-vector.jpg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { API_URL } from '../utils'
import axios from 'axios'
export default function JobSeekerProfile() {
    const navigate = useNavigate();

 

    const [notifications, setNotifications]=useState([])
    const [userProfile, setUserProfile]=useState([])
    const [editUser, setEditUser]=useState({
        username:'',
        user_age:''
    })
    const [profile, setProfile] = useState([])
    const [editjobSeekerProfile, setEditJobseeekerProfile]=useState({
        name:'',
        email:'',
        skills:'',
        workExperience:'',
        education:'',
        certification:'',
        languages:''
    })
    const [file, setFile]=useState()
    const [appliedJobs, setAppliedJobs] = useState([])
    const jobSeeker_id = localStorage.getItem('jobSeeker_id');
    const user_id = localStorage.getItem('user_id')
    const role = localStorage.getItem('role')
    const jobseekerID = localStorage.getItem('jobSeeker_id')
 const [messages, setMessages]=useState([])
    async function fetchMessages(){
      console.log(user_id)
      const response = await axios.get(`${API_URL}/message_by_user_id/`+user_id);
      console.log(response.data)
      setMessages(response.data)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/applied_jobs_by_user/` + jobSeeker_id);
            if (response.status === 200) {
                // Update state immediately
                setAppliedJobs(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchUserProfile=async()=>{
        const authToken = localStorage.getItem('authToken')
        const response = await axios.get(`${API_URL}/user/`+user_id,{body:{authToken:authToken}})
        setUserProfile(response.data.data)
    }
    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/jobseeker/` + jobseekerID);
            if (response.status === 200) {
                console.log(response.data.data)
                setProfile(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    };
    async function getNotifications(){
        const response = await axios.get(`${API_URL}/notification_by_user_id/`+user_id)
        console.log(response)
        setNotifications(response.data)
    }

    async  function handleSubmit(){
        
        const response = await axios.put(`${API_URL}/update_user/`+user_id, {user_age:editUser.user_age,username: editUser.username})
        console.log("respnose", response)
      }
      function handleChange(e){
        e.preventDefault()
        const { name, value } = e.target;
        setEditUser(prevData => ({
            ...prevData, [name]: value
        }))
      }
     async function handleJobSeekerProfileSubmit(){
        debugger;

        const response = await axios.put(`${API_URL}/update_jobseeker/`+jobSeeker_id,editjobSeekerProfile).then((result) => console.log(result))
        .catch((error) => console.error(error));
        
        console.log(response)
        if (response.status===200){
            alert("Job seeker profile update successfully")
        }
        else{
            alert("Could not update your profile.Please try again")
        }
     }
    function handleJobSeekerProfileChange(e){
        e.preventDefault()
        const { name, value } = e.target;
        setEditJobseeekerProfile(prevData => ({
            ...prevData, [name]: value
        }))
    }
    const uploadResume = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('file', file)
        formData.append('filename', file.name)
        formData.append('jobSeeker_id', jobSeeker_id)
        console.log(file)
        try {
            const response = await axios.post(`${API_URL}/upload_resume`,formData,{
                headers:{'Content-Type':'multipart/form-data'}
            })

            if (response.status === 200) {
                alert("Resume uploaded successfully")
               
                // You can also handle the response data here, if needed
            } else {
                alert('Error uploading resume.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while uploading the resume.');
        }
        const response = await axios.put(`${API_URL}/update_jobseeker/`+jobSeeker_id,{resumeURL:file.name}).then((result) => console.log(result))
        .catch((error) => console.error(error));
        fetchProfile()
    };
   
    function getpdf(filepath){
        window.open('https://mbuig2i6bdtonzsxfxbuohmvxq0esskf.lambda-url.ap-southeast-2.on.aws/'+filepath)
    }
    useEffect(() => {
        fetchProfile()
    getNotifications();
    fetchUserProfile();
    fetchMessages()
},[]);
    return (
        <div className='mb-10'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ marginTop: "5%" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/jobseeker">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/jobs">View jobs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ border: 'None', background: 'white', }} href='/applied_jobs'>My Applications</a>
                            </li>
                            <div className="dropdown">
                                <a className="nav-link fw-medium dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Notifications
                                </a>
                                <ul className="dropdown-menu notifications">
                                {notifications.length === 0 ? (
      <li className="">No notifications</li>
    ) : (
      notifications.map((notification) => (
        <li key={notification.notification_id} >
          {notification.content} {/* Assuming notifications have a title property */}
          <hr/>
        </li>
      ))
    )}
                                </ul>
                            </div>
                            <div className="dropdown">
                               
                               <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon} className='msg_icon'></img></a>
                               <ul className="dropdown-menu messages overflow-auto" style={{width:'600px', height:'500px'}}>
                               {messages.length === 0 ? (
     <li className="">No Messages</li>
   ) : (
     messages.map((message) => (
       <li key={message.message_id} >
         {message.body}<h6 style={{textAlign:'right', fontSize:'8px'}}>{message.Timestamp.toLocaleString().slice(0,19).replace('T' , ' ')}</h6>
         <hr/>
       </li>
     ))
   )}
                               </ul>
                           </div>
                            <li className="nav-item">
                                <a className="nav-link" href='/jobseeker_profile' role='button'>Profile</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container d-flex" style={{marginTop:'4%'}}>
                <div className="left-side mr-3">
                    <div className="card mb-3" style={{ width: '300px' }}>
                        <img src={profile_image} style={{ height: '100px', width: '100px' }} className="card-img-top m-auto" alt="..."></img>

                        <div className="card-body text-left mb-3">

                            <h5 className="card-title">Personal Details</h5>
                            <div className="card-text">

                                <h6>ID {profile.jobSeeker_id}</h6>

                                <h6>Username: {userProfile.username}</h6>

                                <h6>Email: {profile.email}</h6>

                                <h6>Age {userProfile.user_age}</h6>
                            </div>
                        <a  href="#editDetails" data-bs-toggle="modal" data-target="#editDetails"   className="btn btn-primary">Edit</a>
                            
                        </div>
                        <div className="modal fade" id="editDetails" tabIndex="-1" aria-labelledby="editDetails" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit contact Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className='m-auto w-100' onSubmit={()=>handleSubmit()}>
            <label htmlFor='#name'>Username</label>
            <input className='form-control' type='text' id='name'  name='name' onChange={handleChange}/>
            <label htmlFor='#user_ageage'>Age</label>
           <input className='form-control' type='number' min='18' max='75' onChange={handleChange} name='user_age'></input>
<hr/>
<div>
<button type="button" className="btn bg-secondary" style={{color:'white', marginRight:'5px', width:'100px'}} data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn bg-primary"  style={{color:'white', width:'200px'}}>Save changes</button>

</div>
    
        </form>
      </div>

    </div>
  </div>
</div>

                    </div>
                    <div className="card" style={{ width: '300px'}}>
                        <div className="card-body">
                            <div className="card-text">
                                <h6>Resume</h6>
                                <a href='#' onClick={()=>getpdf(profile.resumeURL)}   className='mb-3' style={{color:'black'}}>{profile.resumeURL && profile.resumeURL}</a>
                                <form onSubmit={uploadResume}>
                                <input onChange={(e)=>setFile(e.target.files[0])} name='file' className='mb-3' type='file' accept='application/pdf' required />
                                
                                <button className='btn btn-primary w-100' type='submit' >Upload</button>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-side ml-3">
                    <div className='d-flex mb-3'>
                        <div className='w-50'>
                    <h4>Name: {profile.name}</h4>
                    </div>
                    <div className='w-50'>
                    <a  style={{float:'right', color:'blue'}} className='btn' href="#editJobSeeker" data-bs-toggle="modal" data-target="#editJobSeeker"   >Edit Profile</a>
                    </div> 
                    </div>
                    <div><h4>Experience</h4>
                        <div className='EP12 responsive'>
                            <div className='mb-3'>
                                {profile.workExperience}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4> Education </h4>
                        <div className='EP12'>
                            <h6>Certifications & licenses</h6>
                            <p>{profile.certifications}</p>
                            <h6>Degrees</h6>
                            <p>{profile.education}</p>
                        </div>
                    </div>

                    <div>
                        <h4> Skills </h4>
                        <div className='EP12'>
                            <p>{profile.skills}</p>
                        </div>
                        <h4>Languages:</h4>
                        <div className='EP12'>
                            <p> {profile.languages}</p>
                        </div>

                    </div>
                    <div className="modal fade" id="editJobSeeker" tabIndex="-1" aria-labelledby="editJobSeeker" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit Profile</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className='m-auto w-100' onSubmit={handleJobSeekerProfileSubmit}>
           <input className='form-control' type='text' placeholder='Name'  onChange={handleJobSeekerProfileChange} name='name'></input>
           <input className='form-control' type='email' placeholder='email'  onChange={handleJobSeekerProfileChange} name='email'></input>
           <input className='form-control' type='text' placeholder='workExperience' onChange={handleJobSeekerProfileChange} name='workExperience'></input>
           <input className='form-control' type='text' placeholder='Degree' onChange={handleJobSeekerProfileChange} name='education'></input>
           <input className='form-control' type='text' placeholder="certifications"  onChange={handleJobSeekerProfileChange} name='certifications'></input>
           <input className='form-control' type='text' placeholder="skills" onChange={handleJobSeekerProfileChange} name='skills'></input>
           <input className='form-control' type='text' placeholder="languages" onChange={handleJobSeekerProfileChange} name='languages'></input>

<hr/>
<div>
<button type="button" className="btn bg-secondary" style={{color:'white', marginRight:'5px', width:'100px'}} data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn bg-primary"  style={{color:'white', width:'200px'}}>Save changes</button>

</div>
    
        </form>
      </div>

    </div>
  </div>
</div>
                </div>
            </div>
        </div>

    )
}