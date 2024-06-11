import '../css/courses.css';
import '../css/manage_courses&programs.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import React from 'react'
import AdminNavbar from './admin_navbar';
import { API_URL } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import { useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import qs from 'qs'
export default function CoursesAndProgramsManagement() {
  const stdID = localStorage.getItem('std_id');
  const [programs, setPrograms] = useState([])
  const [courses, setCourses] = useState([])
  const [editCourseForm, setEditCourseForm] = useState([])
  const [editProgramForm, setEditProgramForm] = useState([])
  const [courseForm, setCourseForm] = useState([])
  const [programForm, setProgramForm] = useState([])
  const token = localStorage.getItem("authToken")
  const myHeaders = new Headers()
  const [selectedCourse, setSelectedCourse] = useState()
  const [selectedProgram, setSelectedProgram] = useState()
  
  useEffect(() => {
     fetchData();
     myHeaders.append("Authorization", `Bearer ${token}`)
     myHeaders.append("Content-Type","application/x-www-form-urlencoded")
  },[])

  function updateSelectedCourse(id) {
    setSelectedCourse(id)


    const selectedCourseData = courses.find((course) => course.course_id === id);
    setEditCourseForm(selectedCourseData)

    console.log(editCourseForm)
  }
  function updateSelectedProgram(id) {
    setSelectedProgram(id)
    const selectedProgramData = programs.find((program) => program.program_id === id);
    setEditProgramForm(selectedProgramData)

    console.log(editProgramForm)
  }
  const fetchData = async () => {
    try {
      const response =  await axios.get(`${API_URL}/get_all_programs`);
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
  }
  

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
    console.log(editCourseForm)
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
  function getToken(){
    return localStorage.getItem('authToken')
  }
  async function createCourse() {
    let data = qs.stringify({
      'course_name': courseForm.course_name,
      'description': courseForm.description,
      'duration_months': courseForm.duration_months,
      'instructor': courseForm.instructor
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/course`,
      headers: {
        'authentication': `Bearer ${getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Course created successfully")
        }
      })
      .catch((error) => {

        console.log(error);
        debugger;
      });
  }
  async function createProgram() {
    let data = qs.stringify({
      'program_name': programForm.program_name,
      'description': programForm.description,
      'duration_months': programForm.duration,
      'trainer': programForm.trainer 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/program/`,
      headers: {
        'authentication': `Bearer ${getToken()}`,
      },
      data : data
    };
    await axios.request(config)
    .then((response) => {
      if(response)
        toast.success("program created succesfully")
    })
    .catch((error) => {
      console.log(error);
    });

  }
  async function deleteCourse(id) {
    const response = await axios.delete(`${API_URL}/course/` + id, { headers: myHeaders });
    if (response.status === 200) {
      toast.success("course deleted successfully")
    }
  }
  async function deleteProgram(id) {
    const response = await axios.delete(`${API_URL}/program/` + id, { headers: myHeaders });
    if (response.status === 200) {
      toast.success("Program deleted successfully")
    }
  }
  async function editCourse() {
    const course_id = editCourseForm.course_id
    const data = qs.stringify({
      'course_id': editCourseForm.course_id,
      'course_name': editCourseForm.course_name,
      'description': editCourseForm.description,
      'duration': editCourseForm.duration_months,
      'instructor': editCourseForm.instructor,
    })
    // const response = await axios.put(`${API_URL}/course/` + course_id, {data: data}, { headers: myHeaders }).then((data) => console.log(data)).catch((err) => console.log(err))
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${API_URL}/course/${course_id}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
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
  async function editProgram() {
    const program_id = editProgramForm.program_id
    const body = {
      program_id: editProgramForm.program_id,
      program_name: editProgramForm.program_name,
      description: editProgramForm.description,
      duration: editProgramForm.duration_months,
      trainer: editProgramForm.trainer,
    }
    const response = await axios.put(`${API_URL}/update_program/` + program_id, body, { headers: myHeaders }).then((data) => console.log(data)).catch((err) => console.log(err))
    if (response.status === 200) {
      console.log(response)
    }
  }
  return (
    <div>
      <AdminNavbar />
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
          <div className='d-flex' style={{ padding: '25px', marginBottom: '25px', marginLeft: 'auto', marginRight: 'auto', width: '75%' }}>
            <form className='m-auto ' onSubmit={createCourse} id="CreateCourse">

              <div className='mb-3'>
                <input onChange={handleCourseChange} className='form-control' name='course_name' id='courseName' placeholder='course name' type='text' required />

              </div>
              <div className='mb-3'>
                <textarea onChange={handleCourseChange} className='form-control' id='courseDescription' placeholder='description' name='description' type='text' required />

              </div>
              <div className='mb-3'>
                <input onChange={handleCourseChange} className='mr-3' name='duration_months' placeholder='Months duration' id='courseDuration' max='6' type='text' required />
                <input onChange={handleCourseChange} className='mr-3' name='instructor' id='courseInstructor' placeholder='instructor' type='text' required />

              </div>

              <div><button type='submit' className='btn btn-primary' >Create Course</button></div>
              {/*  */}
            </form>

            <div className="modal fade" id="editCourseModal" tabIndex="-1" aria-labelledby="editCourseModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="postJobModalLabel">Post a Job</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form id='UpdateCourse' className='m-auto' onSubmit={editCourse}>
                      <div className='mb-3'>
                        <input type='number' value={selectedCourse}></input>
                        <input onChange={handleEditCourseChange} defaultValue={editCourseForm.course_name} className='' name='course_name' id='courseName' placeholder='course name' type='text' />
                      </div>
                      <div className='mb-3'>
                        <textarea onChange={handleEditCourseChange} defaultValue={editCourseForm.description} className='form-control' id='courseDescription' placeholder='description' name='description' type='text' />
                      </div>
                      <div className='mb-3'>
                      </div>
                      <div className='mb-3'>
                        <input onChange={handleEditCourseChange} defaultValue={editCourseForm.duration_months} name='duration_months' placeholder='Months duration' className="mr-3" id='courseDuration' max='6' type='text' />
                        <input onChange={handleEditCourseChange} defaultValue={editCourseForm.instructor} name='instructor' id='courseInstructor' placeholder='instructor' type='text' />
                      </div>
                      <div><button className='btn btn-primary' >Edit Course</button></div>

                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='m-auto'>
            <table className='m-auto table w-75'>
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
                {courses.map(course => (
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
                      <p style={{ textAlign: 'left' }}>{course.description}</p>


                    </td>
                    <td>
                      <button className='mr-3 btn btn-danger ' onClick={() => deleteCourse(course.course_id)}>Delete</button>
                      <a className='btn btn-info' onClick={() => updateSelectedCourse(course.course_id)} href="#editCourseModal" data-bs-toggle="modal" data-target="#editCourseModal" >Edit course</a>
                    </td>

                  </tr>

                ))}
              </tbody>

            </table>

          </div>
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className='d-flex' style={{ padding: '25px', marginBottom: '25px', marginLeft: 'auto', marginRight: 'auto', width: '75%' }}>
            <form className='m-auto' style={{ width: '' }} onSubmit={createProgram} >
              <div className='mb-3'>
                {/* <label htmlFor='#programName'>Program Name</label> */}
                <input className='form-control' onChange={handleProgramChange} name='program_name' placeholder='Program name' id='programName' type='text' required />

              </div>
              <div className='mb-3'>
                {/* <label htmlFor='#programDescription'>Description</label> */}
                <textarea onChange={handleProgramChange} className='form-control' name='description' placeholder='description' id='programDescriptionName' type='text' required />

              </div>

              <div className='mb-3'>
                {/* <label htmlFor='#programTrainer'>Trainer</label> */}
                <input onChange={handleProgramChange} className='mr-3' name='trainer' placeholder='trainer' id='programTrainer' type='text' required />
                <input onChange={handleProgramChange} className='' name='duration_months' placeholder='Months duration' id='programDuration' max='6' type='text' required />

              </div>
              <div><button type='submit' className='btn btn-primary'>Create Program</button></div>
            </form>

          </div>
          <div className='m-auto'>


            <div className="modal fade" id="editProgramModal" tabIndex="-1" aria-labelledby="editProgramModal" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="postJobModalLabel">Post a Job</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form className='m-auto' style={{ width: '' }} onSubmit={editProgram}>
                      <div className='mb-3'>
                        <input type='number' readOnly={true} value={selectedProgram}></input>
                        <input onChange={handleEditProgramChange} name='program_name' defaultValue={editProgramForm.program_name} placeholder='Program name' id='programName' type='text' />

                      </div>
                      <div className='mb-3'>
                        <textarea onChange={handleEditProgramChange} className='form-control' defaultValue={editProgramForm.description} name='description' placeholder='description' id='programDescriptionName' type='text' />

                      </div>
                      <div className='mb-3'>
                        <input onChange={handleEditProgramChange} className='mr-3' name='duration_months' defaultValue={editProgramForm.duration_months} placeholder='Months duration' id='programDuration' max='6' type='text' />
                        <input onChange={handleEditProgramChange} className='' name='trainer' placeholder='trainer' defaultValue={editProgramForm.trainer} id='programTrainer' type='text' />

                      </div>

                      <div><button type='submit' className='btn btn-primary'>Edit Program</button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <table className='m-auto table w-75'>
              <thead><tr>
                <th>program id</th>
                <th>program Name
                </th>
                <th>Duration Months</th>
                <th>Trainer</th>
                <th>
                  Descriptoin
                </th>
                <th>Action</th>
              </tr></thead>

              <tbody>
                {programs.map(program => (
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
                      <p style={{ textAlign: 'left' }}>{program.description}</p>


                    </td>
                    <td>
                      <button className=' mr-3 btn btn-danger ' onClick={() => deleteProgram(program.program_id)}>Delete</button>
                      <a className='btn btn-info' onClick={() => updateSelectedProgram(program.program_id)} href="#editProgramModal" data-bs-toggle="modal" data-target="#editProgramModal" >Edit</a>

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