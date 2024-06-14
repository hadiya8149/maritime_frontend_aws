import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/admin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import { Tab } from '@mui/material';
import { Work } from '@mui/icons-material';
import {API_URL} from '../utils'
import axios from 'axios'
export default function AdminPage(){
    const navigate=useNavigate();
    const [students, setStudents]=useState(0);
    const [employers, setEmployers]=useState(0);
    const [jobseekers, setJobseekers]=useState(0);
    const [courseApps, setCourseApps]=useState(0);
    const [jobapp, setJobApps]=useState(0);
    const[courses, setCourses]=useState(0);
    const [programs, setPrograms]=useState(0)
    const [programApps, setProgramApps]=useState(0)
    const role = localStorage.getItem('role');
    useEffect(()=>{
        if (role !=='admin'){
            navigate('/')
        }
    },[])
    async function fetchData(){
        await axios.get(`${API_URL}/students`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setStudents(response.data.data.length)).catch((err)=>console.log(err))
        await axios.get(`${API_URL}/employers`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setEmployers(response.data.data.length)).catch((err)=>console.log(err))
        await axios.get(`${API_URL}/jobseekers`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setJobseekers(response.data.data.length)).catch((err)=>console.log(err))
        await axios.get(`${API_URL}/courses`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setCourses(response.data.data.length)).catch((err)=>console.log(err))
        await axios.get(`${API_URL}/get_all_programs`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setPrograms(response.data.data.length)).catch((err)=>console.log(err))
        await axios.get(`${API_URL}/job_applications`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setJobApps(response.data.data.length)).catch((err)=>console.log(err))
        await axios.get(`${API_URL}/all_course_applications`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setCourseApps(response.data.data.length)).catch((err)=>console.log(err))
        await axios.get(`${API_URL}/all_program_applications)`, {headers:{"Authorization":`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>setProgramApps(response.data.data.length)).catch((err)=>console.log(err))
    
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
<div style={{minHeight:'100vh'}}>
<div className='p-5'>
<h2 style={{marginTop:'8px', fontWeight:'bold'}}>Welcome to Admin Portal</h2>

   <div className='container' style={{marginTop:'3', width:'50%', padding:'16px', backgroundColor:'#fafafa', textAlign:'left'}}>
<h4 style={{padding:'8px', margin:'8px'}}>Maritime Job Management</h4>
<div className='row '  id="adminportalrows">
    <div className='col-md-4'>

        <div className='card' id='adminportalcards' style={{height:'130px'}}>
             
            <div className='card-body'>

        <PeopleIcon className='ml-3 mb-3'  color="primary"/>
            <p style={{fontSize:'18px'}}>Total Job seekers : {jobseekers}
            </p>
            </div>
            
            </div>
    </div>
        <div className='col-md-4'>
        <div className='card' id='adminportalcards' style={{height:'130px'}}>
            <div className='card-body'>
            
            <PostAddSharpIcon  className='ml-3 mb-3'  color="primary"/>

        
        <p style={{fontSize:'18px'}}>    Total Applied Jobs : {jobapp}</p>
            </div>
            
        </div>

        </div>
    <div className='col-md-4' >
   
    <div className='card' id='adminportalcards' style={{height:'130px'}}>
     <div className='card-body'>
        <WorkIcon  className='ml-3 mb-3' color=""/>
            <p style={{fontSize:'18px'}}>

            Total Employers: {employers}
            </p>
            </div>
        </div>

    </div>
    </div>

    <h4 style={{padding:'8px', margin:'8px'}}>Maritime Education Management</h4>

    <div className='row ' id="adminportalrows">
    <div className='col-md-4'>
        <div className='card' id='adminportalcards' style={{height:'130px'}}>

            <div className='card-body'>
            <LibraryBooksIcon  className='ml-3 mb-3'  color="success"/>
            <p style={{fontSize:'18px'}}> Total Training Programs: {programs}</p>
         
            </div>
        

        </div>
    </div>
        <div className='col-md-4'>
        <div className='card' id='adminportalcards' style={{height:'130px'}}>
            <div className='card-body' style={{padding:'16px'}}>
            <LibraryBooksIcon className='ml-3 mb-3'  color="warning"/>
            <p style={{fontSize:'18px'}}>
            Total Courses : {courses}
            </p>
            </div>
            
            </div>

        </div>
    <div className='col-md-4'>
    <div className='card' id='adminportalcards'  style={{height:'130px'}}>
         <div className='card-body'>
        <PeopleIcon  className='ml-3 mb-3'  color="primary" />
       <p style={{fontSize:'18px'}}>
        Total students: {students}
        </p>
            </div>
        

           
        </div>

    </div>

    </div>
    <div className='row '  id="adminportalrows">
    <div className='col-md-4 '>
    <div className='card' id='adminportalcards' style={{height:'130px'}}>
        
        <div className='card-body'>
        <PostAddSharpIcon className='ml-3 mb-3'  color="dark"/>
            <p style={{fontSize:'16px'}}>
            Total Course  applications {courseApps}
                </p>
                </div>
                
            </div>
      
    </div>
        <div className='col-md-4'>
        <div className='card' id='adminportalcards' style={{height:'130px'}}>
        
        <div className='card-body'>
    <PostAddSharpIcon className='ml-3 mb-3'  color="dark"/>
        <p style={{fontSize:'16px'}}>
        Total program applications {programApps}
            </p>
            </div>

           
        </div>
        </div>
    <div className='col-md-4'>
    {/* <div className='card' id='adminportalcards' style={{height:'130px'}}>
      
            
  
    </div> */}
    </div>
    </div>

   </div>
   <ToastContainer/>
</div>
</div>
)   
}