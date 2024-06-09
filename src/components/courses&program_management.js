import '../css/courses.css';

import {useState, useEffect} from 'react';
import axios from 'axios'
import React from 'react'
import AdminNavbar from './admin_navbar';
import { API_URL } from '../utils';

export default function CoursesAndProgramsManagement(){
  const stdID = localStorage.getItem('std_id');
  const [programs, setPrograms] = useState([])
  const [courses, setCourses]=useState([])
  const [editCourseForm, setEditCourseForm] =useState([])
  const [editProgramForm, setEditProgramForm]=useState([])
  const [courseForm, setCourseForm]=useState([])
  const [programForm, setProgramForm]=useState([])
  const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/programs`);
        if (response.status === 200) {
          console.log(response.data.data)
            setPrograms(response.data.data);
        }
    } catch (error) {
        console.error(error);
    }
    try {
        const response = await axios.get(`${API_URL}/courses`);
        if (response.status === 200) {
          console.log(response.data.data)
            setCourses(response.data.data);
        }
    } catch (error) {
        console.error(error);
    }

};
  useEffect(() => {
      fetchData();
  }, []);
  function handleCourseChange(e) {
    const { name, value } = e.target;
    setCourseForm(prevData => ({
        ...prevData, [name]: value
    }))
}
function handleEditCourseChange(e) {
  const { name, value } = e.target;
  setEditCourseForm(prevData => ({
      ...prevData, [name]: value
  }))
}
function handleProgramChange(e) {
  const { name, value } = e.target;
  setProgramForm(prevData => ({
      ...prevData, [name]: value
  }))
}
function handleEditProgramChange(e) {
  const { name, value } = e.target;
  console.log(name, value)
  setEditProgramForm(prevData => ({
      ...prevData, [name]: value
  }))
}
  async function createCourse(){
    const response = await axios.post(`${API_URL}/course`, {body:courseForm});
    console.log(response)
    if (response.status===201)
      alert("Course created successfully")
    }

  async function createProgram(){
    console.log(programForm)
const response = await axios.post(`${API_URL}/program`, {body:programForm});
    console.log(response)
    if (response.status===201)
      alert("Program created successfully")
    }
    
  async function deleteCourse(id){
    const response = await axios.delete(`${API_URL}/course/`+id);
    if (response.status===200){
      alert("course deleted successfully")
    }
  }
  async function deleteProgram(id){
    const response = await axios.delete(`${API_URL}/program/`+id);
    if (response.status===200){
      alert("Program deleted successfully")
    }
  }
  async function editCourse(){
    const course_id = editCourseForm.course_id
    const body = {
    course_id:editCourseForm.course_id,
      course_name: editCourseForm.course_name,
      description:editCourseForm.description,
      duration:editCourseForm.duration_months,
      instructor:editCourseForm.instructor,  
    }
    const response  = await axios.put(`${API_URL}/course/`+course_id, body ).then((data)=>console.log(data)).catch((err)=>console.log(err))
    console.log(response)
    alert('course update successfully') 
  }
  async function editProgram(){
    const program_id = editProgramForm.program_id
    const body = {
    program_id:editProgramForm.program_id,
      program_name: editProgramForm.program_name,
      description:editProgramForm.description,
      duration:editProgramForm.duration_months,
      trainer:editProgramForm.trainer,  
    }
    const response  = await axios.put(`${API_URL}/update_program/`+program_id, body ).then((data)=>console.log(data)).catch((err)=>console.log(err))
    if(response.status===200){
      console.log(response)
    }    
  }
    return (
      <div>
        <AdminNavbar/>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Courses</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Programs</button>
  </li>

</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
<div className='d-flex' style={{padding:'25px', marginBottom:'25px', marginLeft:'auto', marginRight:'auto', width:'75%'}}>
  <form className='m-auto '  id="CreateCourse">

<div className='mb-3'>
<input onChange={handleCourseChange} className='form-control'name='course_name' id='courseName' placeholder='course name' type='text' required/>

</div>
<div className='mb-3'>
<textarea onChange={handleCourseChange}  className='form-control' id='courseDescription' placeholder='description' name='description' type='text' required/>

</div>
<div className='mb-3'>
<input onChange={handleCourseChange} className='mr-3'  name='duration_months' placeholder='Months duration' id='courseDuration'max='6' type='text' required/>
<input onChange={handleCourseChange} className='mr-3' name='instructor' id='courseInstructor' placeholder='instructor' type='text' required/>

</div>

<div><button type='submit' className='btn btn-primary' >Create Course</button></div>

</form>
<form id='UpdateCourse' className='m-auto' onSubmit={editCourse}>
<div className='mb-3'>
<select className='mr-3' name='course_id' onChange={handleEditCourseChange}>
  <option>course id</option>
  {courses.map((course)=>{
  return(
  <option name={course.course_id} key={course.course_id}>
{course.course_id}
  </option>
)  })}
</select>
<input onChange={handleEditCourseChange} className=''name='course_name' id='courseName' placeholder='course name' type='text' />

</div>


<div className='mb-3'>
<textarea onChange={handleEditCourseChange}  className='form-control' id='courseDescription' placeholder='description' name='description' type='text' />

</div>
<div className='mb-3'>

</div>
<div className='mb-3'>
  <input onChange={handleEditCourseChange}  name='duration_months' placeholder='Months duration' className="mr-3" id='courseDuration'max='6' type='text' />

<input onChange={handleEditCourseChange}  name='instructor' id='courseInstructor' placeholder='instructor' type='text' />

</div>
<div><button  className='btn btn-primary' >Edit Course</button></div>

</form>
</div>
<div className='m-auto'>
<table  className='m-auto table w-75'>
<thead><tr>
  <th>Course id</th>
  <th>Course Name
    </th>
    <th>Duration Months</th>
    <th>Instructor</th>
    <th>
      Descriptoin
    </th>
    <th>Delete</th>
    </tr></thead>

    <tbody>
  {courses.map(course=>(
  <tr key={course.course_name}>
  <td>{course.course_id}</td>
   <td>
{course.course_name}

    </td> 
  <td>
{course.duration_months}
    
  </td>
  <td>
{course.instructor}

  </td>
  <td className='col-4 overflow-auto'>
  <h6>{course.description}</h6>


  </td>
  <td>
<button className='mt-3 btn btn-danger ' onClick={()=>deleteCourse(course.course_id)}>Delete</button>

  </td>

  </tr>

))}
</tbody>

</table>

 </div>
  </div>
  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    <div className='d-flex'style={{padding:'25px', marginBottom:'25px', marginLeft:'auto', marginRight:'auto', width:'75%'}}>
    <form className='m-auto' style={{width:''}} onSubmit={createProgram} >
          <div className='mb-3'>
            {/* <label htmlFor='#programName'>Program Name</label> */}
          <input  className='form-control'   onChange={handleProgramChange} name='program_name'  placeholder='Program name' id='programName' type='text'required />

          </div>
          <div className='mb-3'>
            {/* <label htmlFor='#programDescription'>Description</label> */}
          <textarea onChange={handleProgramChange}  className='form-control'   name='description'  placeholder='description' id='programDescriptionName' type='text' required/>

          </div>
         
          <div className='mb-3'>
            {/* <label htmlFor='#programTrainer'>Trainer</label> */}
          <input onChange={handleProgramChange}   className='mr-3'  name='trainer' placeholder='trainer' id='programTrainer' type='text' required/>
          <input onChange={handleProgramChange}   className=''  name='duration_months'  placeholder='Months duration' id='programDuration' max='6' type='text'required />

          </div>
          <div><button type='submit' className='btn btn-primary'>Create Program</button></div>
        </form>
        <form className='m-auto' style={{width:''}} onSubmit={editProgram}>
          <div className='mb-3'>
            <select name='program_id' className='mr-3' onChange={handleEditProgramChange}>
  <option>Program id</option>
  {programs.map((program)=>{
  return(
  <option name={program.program_id} key={program.program_id}>
{program.program_id}
  </option>
)  })}
</select>
          <input     onChange={handleEditProgramChange} name='program_name'  placeholder='Program name' id='programName' type='text' />

          </div>
          <div className='mb-3'>
          <textarea onChange={handleEditProgramChange}  className='form-control'   name='description'  placeholder='description' id='programDescriptionName' type='text' />

          </div>
          <div className='mb-3'>
          <input onChange={handleProgramChange}   className='mr-3'  name='duration_months'  placeholder='Months duration' id='programDuration' max='6' type='text' />
          <input onChange={handleProgramChange}   className=''  name='trainer' placeholder='trainer' id='programTrainer' type='text' />

          </div>
      
          <div><button type='submit' className='btn btn-primary'>Edit Program</button></div>
        </form>
    </div>
    <div className='m-auto'>
<table  className='m-auto table w-75'>
<thead><tr>
  <th>program id</th>
  <th>program Name
    </th>
    <th>Duration Months</th>
    <th>Trainer</th>
    <th>
      Descriptoin
    </th>
    <th>Delete</th>
    </tr></thead>

    <tbody>
  {programs.map(program=>(
  <tr key={program.program_name}>
  <td>{program.program_id}</td>
   <td>
{program.program_name}

    </td> 
  <td>
{program.duration_months}
    
  </td>
  <td>
{program.trainer}

  </td>
  <td className='col-4 overflow-auto'>
  <h6>{program.description}</h6>


  </td>
  <td>
<button className='mt-3 btn btn-danger ' onClick={()=>deleteProgram(program.program_id)}>Delete</button>

  </td>

  </tr>

))}
</tbody>

</table>

 </div>
  </div>
</div>
      </div>
    )
}