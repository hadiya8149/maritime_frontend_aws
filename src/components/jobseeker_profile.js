import msg_icon from '../assets/icons8-message-50.png'
import '../css/jobseeker.css'
import profile_image from '../assets/profile-icon-design-free-vector.jpg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { API_URL } from '../utils'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs';
import 'react-toastify/dist/ReactToastify.css';

export default function JobSeekerProfile() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken')
    const [notifications, setNotifications] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const [editUser, setEditUser] = useState({
        username: '',
        user_age: ''
    })
    const [profile, setProfile] = useState([])
    const [editjobSeekerProfile, setEditJobseeekerProfile] = useState({
        name: '',
        email: '',
        skills: '',
        workExperience: '',
        education: '',
        certification: '',
        languages: ''
    })
    const [file, setFile] = useState()
    const [appliedJobs, setAppliedJobs] = useState([])
    const jobSeeker_id = localStorage.getItem('jobSeeker_id');
    const user_id = localStorage.getItem('user_id')
    const role = localStorage.getItem('role')
    const jobseekerID = localStorage.getItem('jobSeeker_id')
    const [messages, setMessages] = useState([])

    const myHeaders = new Headers()

    // const authToken = localStorage.getItem('authToken')
    useEffect(() => {
        myHeaders.append("Authorization", `Bearer ${token}`)

    }, [])
    async function fetchMessages() {

        console.log(user_id)
        const response = await axios.get(`${API_URL}/message_by_user_id/` + user_id, { headers: myHeaders });
        console.log(response.data)
        setMessages(response.data.data)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/applied_jobs_by_user/` + jobSeeker_id, { headers: myHeaders });
            if (response.status === 200) {
                // Update state immediately
                setAppliedJobs(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchUserProfile = async () => {
        const response = await axios.get(`${API_URL}/user/` + user_id, { headers: myHeaders })
        setUserProfile(response.data.data)
    }
    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/jobseeker/` + jobseekerID, { headers: myHeaders });
            if (response.status === 200) {
                console.log(response.data.data)
                setProfile(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    };
    async function getNotifications() {
        const response = await axios.get(`${API_URL}/notification_by_user_id/` + user_id, { headers: myHeaders })
        console.log(response)
        setNotifications(response.data)
    }

    async function handleSubmit() {
        let data = qs.stringify({
            'user_age': editUser.user_age,
            'user_name': editUser.username,
            '': ''
        });
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${API_URL}/update_user/${user_id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("success")
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    function handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target;
        setEditUser(prevData => ({
            ...prevData, [name]: value
        }))
    }
    async function handleJobSeekerProfileSubmit() {
        let data = qs.stringify(editjobSeekerProfile);
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${API_URL}/update_jobseeker/${jobSeeker_id}`,
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

    function handleJobSeekerProfileChange(e) {
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
            const response = await axios.post(`${API_URL}/upload_resume`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }, { headers: myHeaders })

            if (response.status === 200) {
                toast.success("Resume uploaded successfully")

                // You can also handle the response data here, if needed
            } else {
                toast.error('Error uploading resume.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while uploading the resume.');
        }




        const response = await axios.put(`${API_URL}/update_jobseeker/` + jobSeeker_id, { resumeURL: file.name }, { headers: myHeaders }).then((result) => console.log(result))
            .catch((error) => console.error(error));
        fetchProfile()
    };

    function getpdf(filepath) {
        window.open('https://mbuig2i6bdtonzsxfxbuohmvxq0esskf.lambda-url.ap-southeast-2.on.aws/' + filepath)
    }
    useEffect(() => {
        fetchProfile()
        getNotifications();
        fetchUserProfile();
        fetchMessages()
    }, []);
    return (
        <div className='mb-10'>
            <ToastContainer />

            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
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
                                                <hr />
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                            <div className="dropdown">

                                <a className="nav-link fw-medium " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={msg_icon} className='msg_icon'></img></a>
                                <ul className="dropdown-menu messages overflow-auto" style={{ width: '600px', height: '500px' }}>
                                    {messages.length === 0 ? (
                                        <li className="">No Messages</li>
                                    ) : (
                                        messages.map((message) => (
                                            <li key={message.message_id} >
                                                {message.body}<h6 style={{ textAlign: 'right', fontSize: '8px' }}>{message.Timestamp.toLocaleString().slice(0, 19).replace('T', ' ')}</h6>
                                                <hr />
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
            {/* <div className="" style={{ marginTop: '4%' }}>
                <div className=''></div>
                <div className="">
                    <div className="card" id="profile-card">
                        <img src={profile_image} style={{ height: '100px', width: '100px' }} className="card-img-top m-auto" alt="..."></img>

                        <div className="card-body text-left mb-3">

                            <h5 className="card-title">Personal Details</h5>
                            <div className="card-text " style={{textAlign:'left'}}>

                                <p >ID {profile.jobSeeker_id}</p >

                                <p >Username: {userProfile.username}</p >

                                <p >Email: {profile.email}</p >

                                <p >Age {userProfile.user_age}</p >
                            </div>
                            <a href="#editDetails" data-bs-toggle="modal" data-target="#editDetails" className="btn btn-primary">Edit</a>

                        </div>
                        <div className="modal fade" id="editDetails" tabIndex="-1" aria-labelledby="editDetails" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit contact Details</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className='m-auto w-100' onSubmit={() => handleSubmit()}>
                                            <label htmlFor='#name'>Username</label>
                                            <input className='form-control' type='text' id='name' name='name' onChange={handleChange} />
                                            <label htmlFor='#user_ageage'>Age</label>
                                            <input className='form-control' type='number' min='18' max='75' onChange={handleChange} name='user_age'></input>
                                            <hr />
                                            <div>
                                                <button type="button" className="btn bg-secondary" style={{ color: 'white', marginRight: '5px', width: '100px' }} data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn bg-primary" style={{ color: 'white', width: '200px' }}>Save changes</button>

                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="" id="resume-card" >
                        <div className="card-body">
                            <div className="card-text">
                                <h6>Resume</h6>
                                <a href='#' onClick={() => getpdf(profile.resumeURL)} className='mb-3' style={{ color: 'black' }}>{profile.resumeURL && profile.resumeURL}</a>
                                <form onSubmit={uploadResume} id="resume_form">
                                    <input onChange={(e) => setFile(e.target.files[0])} name='file' className='mb-3' type='file' accept='application/pdf' required />

                                    <button className='btn btn-primary w-100' type='submit' >Upload</button>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div>
                    <div className='jobseeker_profile_edit_div mb-3'>
                        <div className='w-50'>
                            <h4>Name: {profile.name}</h4>
                        </div>
                        <div className='w-50'>
                            <a className='btn' id='editprofilebtn' href="#editJobSeeker" role='button' data-bs-toggle="modal" data-target="#editJobSeeker"   >Edit Profile</a>
                        </div>
                    </div>
                    <div><h4>Experience</h4>
                        <div className='EP12'>
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
                    </div>
                   
                </div>
                <div className=''></div>
            </div> */}
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card profile-card">
                            <img src={profile_image} className="card-img-top mx-auto" alt="..." style={{ height: "100px", width: "100px" }} />
                            <div className="card-body" style={{ textAlign: 'left' }}>
                                <h5 className="card-title">Personal Details</h5>
                                <div className="card-text">
                                    <p>ID: {profile.jobSeeker_id}</p>
                                    <p>Username: {userProfile.username}</p>
                                    <p>Email: {profile.email}</p>
                                    <p>Age: {userProfile.user_age}</p>
                                </div>
                                {/* <a href="#editDetails" data-bs-toggle="modal" data-bs-target="#editDetails" className="btn btn-primary">Edit</a> */}
                            </div>
                        </div>

                        <div className="modal fade" id="editDetails" tabIndex="-1" aria-labelledby="editDetails" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Contact Details</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="m-auto w-100" onSubmit={() => handleSubmit()}>
                                            <label htmlFor="#name">Username</label>
                                            <input className="form-control" type="text" id="name" name="name" onChange={handleChange} />
                                            <label htmlFor="#user_age">Age</label>
                                            <input className="form-control" type="number" id='user_age' min="18" max="75" onChange={handleChange} name="user_age" />
                                            <hr />
                                            <div>
                                                <button type="button" className="btn btn-secondary"
                                                    //   style="color: white; margin-right: 5px; width: 100px;"
                                                    data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary"
                                                //   style="color: white; width: 200px;"
                                                >Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card resume-card">
                            <div className="card-body">
                                <div className="card-text">
                                    <h6>Resume</h6>
                                    {profile.resumeURL && (
                                        <a href="#" onClick={() => getpdf(profile.resumeURL)} className="mb-3 text-black">
                                            {profile.resumeURL}
                                        </a>
                                    )}
                                    <form onSubmit={uploadResume} id="resume_form">
                                        <input onChange={(e) => setFile(e.target.files[0])} name="file" className="mb-3" type="file" accept="application/pdf" required />
                                        <button className="btn btn-primary w-100" type="submit">Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="jobseeker-profile">
                            <div className="d-flex justify-content-between  align-items-center mb-3">
                                <h4>Full Name: {profile.name}</h4>
                                <a className="btn" id="editprofilebtn" href="#editJobSeeker" role="button" data-bs-toggle="modal" data-bs-target="#editJobSeeker">
                                    Edit Profile
                                </a>
                            </div>

                            <div style={{ height: '100px' }}>
                                <h4 className='bg-light bg-gradient sections'>Experience</h4>
                                <div className="mb-3">
                                    {profile.workExperience}
                                </div>
                            </div>

                            <div style={{ height: '100px' }}>
                                <h4 className='bg-light bg-gradien'>Education</h4>
                                <div className='mb-3'>
                                    {profile.education}
                                </div>
                            </div>
                            <div style={{ height: '100px' }}>

                                <h4 className='bg-light bg-gradien'>Certifications & licenses</h4>
                                <div className='mb-3'>
                                    {profile.certifications}
                                </div>
                            </div>
                            <div style={{ height: '100px' }}>

                                <h4 className='bg-light bg-gradien'>Skills</h4>
                                <div className='mb-3'>
                                    {profile.skills}
                                </div>
                            </div>
                            <div style={{ height: '100px' }}>
                                <h4 className='bg-light bg-gradien rounded-5'>Languages</h4>
                                <div className='mb-3'>
                                    {profile.languages}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editJobSeeker" tabIndex="-1" aria-labelledby="editJobSeeker" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-left">
                            <form className='m-auto w-100' onSubmit={handleJobSeekerProfileSubmit}>
                              
<div className='d-flex'>
    <div  className='mr-3'>
                                <label  style={{fontSize:'18px', color:'black'}} className='form-label' htmlFor='#name'>Name</label>
                                <input className='form-control ' type='text' placeholder='Name' defaultValue={profile.name} onChange={handleJobSeekerProfileChange} name='name'></input>

    </div>
<div>

<label  style={{fontSize:'18px', color:'black'}} className='form-label' htmlFor='#email'>Email</label>
<input className='form-control' type='email' placeholder='email' defaultValue={profile.email} onChange={handleJobSeekerProfileChange} name='email'></input>

</div>
</div>

                             
                                <label htmlFor='#workExperience' style={{fontSize:'18px', color:'black'}}>Work Experience</label>
                                <textarea className='form-control' id='workExperience' type='text' placeholder='workExperience' defaultValue={profile.workExperience} onChange={handleJobSeekerProfileChange} name='workExperience'/>
                                <label htmlFor='#education' style={{fontSize:'18px', color:'black'}} >Education</label>
                              
                                <input className='form-control' type='text' placeholder='Degree' defaultValue={profile.education} onChange={handleJobSeekerProfileChange} name='education'></input>
                                <label htmlFor='certifications' style={{fontSize:'18px', color:'black'}}>Certifications & licenses</label>
                              
                                <input className='form-control' type='text' placeholder="certifications" defaultValue={profile.certifications} onChange={handleJobSeekerProfileChange} name='certifications'></input>
                                <label htmlFor='#skills' style={{fontSize:'18px', color:'black'}} >Skills</label>
                              
                                <input className='form-control' type='text' placeholder="skills"  defaultValue={profile.skills} onChange={handleJobSeekerProfileChange} name='skills'></input>
                                <label htmlFor='#languages' style={{fontSize:'18px', color:'black'}}>Languages</label>
                              
                                <input className='form-control' type='text' placeholder="languages"  defaultValue={profile.languages} onChange={handleJobSeekerProfileChange} name='languages'></input>

                                <hr />
                                <div>
                                    <button type="button" className="btn bg-secondary" style={{ color: 'white', marginRight: '5px', width: '100px' }} data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn bg-primary" style={{ color: 'white', width: '200px' }}>Save changes</button>

                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}