import msg_icon from '../assets/icons8-message-50.png'
import React from 'react'
import axios from 'axios'
import { API_URL } from '../utils'
import '../css/profile.css'
import { useCallback, useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyCoursesAndPrograms() {
    const navigate = useNavigate()
    const [myCourses, setMyCourses] = useState([])
    const [myPrograms, setMyPrograms] = useState([])
    const std_id = localStorage.getItem('std_id')
    const token = localStorage.getItem('authToken')
    const myHeaders = new Headers()

    useEffect(()=>{
        myHeaders.append("authentication", `Bearer ${token}`)
        
    }, [])

    const fetchCourses = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/course_application_by_std/`+std_id, {headers:myHeaders});
            if (response.status === 200) {
                console.log(response.data.data)
                setMyCourses(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    });
    const fetchPrograms = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/program_application_by_std/${std_id}`, {headers:myHeaders});
            if (response.status === 200) {
                console.log(response.data.data)
                setMyPrograms(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    });
    useEffect(() => {
        fetchCourses()
        fetchPrograms()
    }, []);
    return (
        <div style={{minHeight:'100vh'}}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
            <div className="container m-auto">
      
                <div>

                <h4 className='text-center'> My Courses</h4>

                    <div id='table-container' style={{marginTop:'3%'}}>
<table className='table text-left m-auto' id="myProgramsTable">
    <thead>
    <tr className='table-info' ><th >Course Name</th>
    <th  >Link</th>
    </tr>
        </thead>
        <tbody>

           {myCourses.map(course => {

                        return (
        <tr key={course.course_id}>
                                <td style={{ marginBottom: '5px' }}>{course.course_name}</td>
                                <td><a href={`/course_info/${course.course_id}`} style={{color:'blue', textDecoration:'underline'}}>Go to course</a></td>
                           
        </tr>    
            
        )
                    })}
                            </tbody>
</table>
         
                    </div>
                    <hr />
                    <h4 className='text-center'>My Training Programs</h4>
                    <div id="table-container" style={{padding:'16px', marginBottom:'5%'}}>

                    <table className='table text-left m-auto' id="myCoursesTable">
    <thead>
    <tr className='table-info'><th>Course Name</th>
    <th>Link</th>
    </tr>
        </thead>
        <tbody>
                    {myPrograms && myPrograms.map(program => {
                        return (
                            <tr key={program.program_id}>
                            <td style={{ marginBottom: '5px' }}>{program.program_name}</td>
                            <td><a href={`/program_info/${program.program_id}`} style={{color:'blue', textDecoration:'underline'}}>Go to Program</a></td>
                       
    </tr>    
        
                        )
                    })}
                      </tbody>
</table>
         
                    </div>
                </div>

            </div>
        </div>
    )
}