import '../css/profile.css'
import '../css/messages.css'
import '../css/employer.css'
import {useState, useEffect, useCallback} from 'react'
import msg_icon from '../assets/icons8-message-50.png'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils';
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import qs from 'qs'
import profile_image from '../assets/profile-icon-design-free-vector.jpg'
export default function EmployerProfile() {
  const [enableEdit, setEnableEdit]=useState(false)
    const [profile, setProfile]=useState([])
    const [editProfile, setEditProfile]=useState([])
    const employer_id=localStorage.getItem('employer_id')
  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('authToken')
  const myHeaders = new Headers()
  useEffect(()=>{
    myHeaders.append('Authorization',`Bearer ${token}`)
  })

    const fetchProfile = useCallback(async () => {
        try {
            const employer_id = localStorage.getItem("employer_id")

            const response = await axios.get(`${API_URL}/employer/`+employer_id, {headers:myHeaders});
            if (response.status === 200) {
              console.log(response.data.data)
              setProfile(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    }, []);
    async function handleSubmit(){
      let data = editProfile;
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL}/update_employer/${employer_id}`,
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      

    }
    function handleChange(e){
      e.preventDefault()
      const { name, value } = e.target;
      setEditProfile(prevData => ({
          ...prevData, [name]: value
      }))
    }

  useEffect(() => {
    fetchProfile();
},[]);
    return (
        <div style={{minHeight:'100vh'}}>
<div className='container pt-7 mb-10' style={{display:'flex', justifyContent:'center',minHeight:'80vh', alignItems:'center'}} >
           <div className='card' style={{border:'none', backgroundColor:'light'}}>
  <div className='row' style={{height:'80%'}}>
            <div className='col-sm  p-3' >

                  <div className='card gradient-custom' id='employer_profile_card' style={{height:'300px;'}}>
                  <div className="card-body" >
                            
                            <img src={profile_image} style={{ height: '100px', width: '100px' }} className="card-img" alt="..."></img>
                            <div className='mb-3' style={{color:'white', textAlign:'left'}}>
                                <h5 style={{color:'white'}}>Personal Details</h5>

                            <p style={{color:'white'}} >username{profile.username}</p>
                            <div>
                                <p  style={{color:'white'}}>Employer id : {profile.employer_id}</p>
                              
                            <p  style={{color:'white'}}>Email: {profile.email}</p>
                            </div>
                            </div>
                        </div>

                  </div>
            </div>
<div className='col-md-10 p-3'>
<div className='card company' id="company_card" style={{border:'0px', minHeight:'100%'}}>
<div className="">
      <div className="">
      <form className='m-auto w-100' onSubmit={handleSubmit}>
        <h4>Company Name</h4>
        
           <input className='form-control mb-3' type='text' disabled={!enableEdit} placeholder='Company Name' defaultValue={profile.company_name}  onChange={handleChange} name='company_name'></input>
           <h4>Description</h4>
        
           <textarea className='form-control mb-3'  placeholder='Description '  disabled={!enableEdit} defaultValue={profile.description}onChange={handleChange} name='description'></textarea>
           <h4>Website</h4>
        
           <input className='form-control mb-3' type='text' placeholder="Company Website" disabled={!enableEdit}  defaultValue={profile.company_website} onChange={handleChange} name='company_website'></input>

           <h4>Contact Details</h4>

<input className='form-control' type='email' placeholder="Company email" defaultValue={profile.contact_email}  disabled={!enableEdit} onChange={handleChange} name='contact_email'></input>

          <div className='text-left mb-3' style={{ fontStyle:'italic' , textAlign:'left',color:'black', fontSize: '1.5rem',
    fontWeight: '700px'}}>+92({profile.contact_number})</div>
           <input className='form-control' type='number'  disabled={!enableEdit}  placeholder="Company number" defaultValue={profile.contact_number} onChange={handleChange} name='contact_number'></input>
          <h4>Company size</h4>
           <input className='form-control' type='number'  disabled={!enableEdit}  placeholder="Company Size" defaultValue={profile.company_size} onChange={handleChange} name='company_size'></input>
<h4>Location</h4>
<hr/>
<div>

</div>
           <input className='form-control' type='text' placeholder='Location' disabled={!enableEdit}  defaultValue={profile.location} onChange={handleChange} name='location'></input>


<hr/>
<div>
<button type="button" className="btn bg-info" onClick={()=>{setEnableEdit(true)}} style={{color:'white', marginRight:'5px', width:'100px'}} >Edit</button>
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
            </div>
    )
}