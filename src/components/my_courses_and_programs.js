import msg_icon from '../assets/icons8-message-50.png'
import React from 'react'
import axios from 'axios'
import { useCallback, useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function MyCoursesAndPrograms() {
    const navigate = useNavigate()
    const [myCourses, setMyCourses] = useState([])
    const [myPrograms, setMyPrograms] = useState([])
    const std_id = localStorage.getItem('std_id')

    const fetchCourses = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/course_application_by_std/'+std_id);
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
            const response = await axios.get('http://localhost:8000/api/program_application_by_std/'+std_id);
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
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{marginTop:'5%'}}>
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="/student">Home</a>
        </li>
     
        <li class="nav-item">
          <a class="nav-link" href="/my_course&programs">My Courses and Programs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile">Profile</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
            <div className="container m-auto">
      
                <div>


                    <div style={{padding:'16px', marginTop:'3%'}}>
                    <h4 className='text-center'> My Courses</h4>
<table className='table text-left'>
    <thead>
    <tr><th>Course Name</th>
    <th></th>
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
                    <div style={{padding:'16px', marginBottom:'5%'}}>

                    <table className='table text-left'>
    <thead>
    <tr><th>Course Name</th>
    <th></th>
    </tr>
        </thead>
        <tbody>
                    {myPrograms.map(program => {
                        return (
                            <tr key={program.program_id}>
                            <td style={{ marginBottom: '5px' }}>{program.program_name}</td>
                            <td><a href={`/course_info/${program.program_id}`} style={{color:'blue', textDecoration:'underline'}}>Go to Program</a></td>
                       
    </tr>    
        
                        )
                    })}
                      </tbody>
</table>
         
                    </div>
                </div>

            </div>
        </>
    )
}