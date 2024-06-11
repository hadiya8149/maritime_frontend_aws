import '../css/courses.css';
import courseImage from '../assets/images.jpg'
import React from 'react'
import courseBanner from '../assets/study-w1880x1253.jpeg'
import { API_URL } from '../utils';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import qs from 'qs'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
export default function CoursesList() {
  const [courses, setCourses] = useState([])
  const stdID = localStorage.getItem('std_id')
  const [filterQuery, setFilterQuery] = useState()
  const [searchQuery, setSearchQuery] = useState([])
  const token = localStorage.getItem('authToken')
  const myHeaders = new Headers();
  function handleFilterChange(e) {
    setFilterQuery(e.target.value)
    console.log("filter", filterQuery)
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      if (response.status === 200) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }

  }, []);
  const enrollCourse = async (id) => {
    if (!stdID) {
      toast.warning("please login to continue")
    }
    else {
      let data = qs.stringify({
        'AppDate': new Date().toISOString().slice(0, 19).replace('T', ' '),
        'Status': '"pending"',
        'course_id': id,
        'program_id': 'null',
        'std_id': stdID
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_URL}/apply_for_course`,
        headers: {
          "authentication": `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      const response = await axios.request(config)
        .then((response) => {
          console.log(response)
          if (response.data.success) {
            toast.success("Course enrolled successfully")
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(response)
    }


  }
  function search(data) {
    if (searchQuery.length > 1)
      return data.filter((course) =>
        course.course_name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  function filterCourses(data) {
    if (filterQuery) {
      console.log(filterQuery, "filter query")
      console.log("data", data)
      console.log(data.filter((obj) => {
        return obj.duration_months === filterQuery;
      }))
      return data.filter((obj) => {
        return obj.duration_months === filterQuery;
      })

    }

  }
  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div style={{ minHeight: '100vh' }} id="CourseBanner">
      <ToastContainer />

      <div className="d-flex flex-column sidebar flex-shrink-0 p-3 bg-light " >
        <span className="fs-4">Search Courses</span>

        <hr />
        <div className='input-group'>
          <input type="text" name='search' onChange={(e) => setSearchQuery(e.target.value)} placeholder="search" className="form-control" />
          <SearchIcon className='input-group-text' style={{
            height: 'auto', backgroundColor: 'white', fonSize:
              '16px', width: '40px'
          }} />

        </div>

        <ul className=" mb-auto" style={{ listStyleType: 'none', paddingLeft: '25px', textAlign: 'left' }}>
          <li>Filter<hr /></li>
          <li><span>Duration</span>
            <select onChange={(e) => { handleFilterChange(e) }} style={{
              borderRadius: '5px'
              , border: ' 1px solid #ccc'
              , padding: ' 10px 15px'
              , marginBottom: '15px'
              , fontSize: '16px'
              , width: '100%', backgroundColor: 'white'
            }}>
              <option></option>
              <option name='1'>1</option>
              <option name='2'>2</option>
              <option name='3'>3</option>
              <option name='4'>4</option>
              <option name='5'>5</option>
              <option name='6'>6</option>
            </select>
          </li>

        </ul>
      </div>

      <div className='courses   p-5'>
        <div className='mb-3' style={{ padding: '16px', margin: 'auto' }}>
          {(filterCourses(courses) || search(courses)) && (<h2>Search Results</h2>)}
          {/* {filterCourses(courses)&&(<h2>Search Results</h2>)} */}
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {filterCourses(courses) && filterCourses(courses).map((dataObj) => {
              return (
                <div className='col'>
                  <div className="card mb-3 m-auto">
                    <div className=''>
                      <img className="card-img" src={courseImage} alt="Card cap"></img>
                      <div className="card-body text-left">
                        <h5>{dataObj.course_name}</h5>
                        <h6>Certificate</h6>
                        <h6>Description: {dataObj.description}</h6>
                        <h6> Duration : {dataObj.duration_months} months</h6>
                        <button className="btn btn-success" onClick={() => enrollCourse(dataObj.course_id)}>Enroll</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='row row-cols-1 row-cols-md-3 g-4'>

            {search(courses) && search(courses).map((dataObj) => {

              return (

                <div className="box">

                  <div className='col'>
                    <div className="card">
                      <div style={{ padding: '4px' }}>

                        <div className="card-body text-left">
                          <h4 className='card-title'>Course ID: {dataObj.course_id}</h4>

                          <h5>{dataObj.course_name}</h5>
                          <h6>Certificate</h6>
                          <h6>Description: {dataObj.description}</h6>
                          <h6> Duration : {dataObj.duration_months} months</h6>
                          <button className="btn btn-success " onClick={() => enrollCourse(dataObj.course_id)}>Enroll</button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              );

            })}

          </div>
        </div>

        <h1>
          Courses at Maritime education system
        </h1>
        <h4 className='headline '>Explore new and Advanced courses to begin your journey.</h4>
        <div className='row row-cols-1 row-cols-md-3 g-4'>
          {courses.map(course => {
            return (
              <div className='col'>
                <div className="card mb-3 ">
                  <div className=''>
                    <img className="card-img" src={courseImage} alt="Card cap"></img>
                    <div className="card-body">
                      <h5>{course.course_name}</h5>
                      <h6>Certificate</h6>
                      <h6>Description: {course.description}</h6>
                      <h6> Duration : {course.duration_months} months</h6>
                      <button className="btn btn-success" onClick={() => enrollCourse(course.course_id)}>Enroll</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <div className='mb-3'>

      </div>
    </div>


  )
}