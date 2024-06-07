<div className='d-flex '>
<div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
<span className="fs-4">Search</span>

<hr />
<input type="text" placeholder="search" className="m-2" />
<ul style={{listStyleType:'none', paddingLeft:'0'}} className=" mb-auto">

<li>
<h5 className='text-center'>Duration months</h5>
<div className='text-left'>
  <div className="mb-5 pt-3 pr-1 pl-1">
    <input  type="number" max='5'  id="newDateCheckbox" />
  </div>

</div>
<div className="mb-3">
  <button className='btn btn-primary'>Apply</button>
</div>
</li>
</ul>
</div>
  <div className='mt-5 w-100'>
  <h4 className='headline'>Manage Courses & programs</h4>
  <div className='row m-auto '>
    <div className='col m-auto'>
        <form className='m-auto'style={{width:'50%'}}>

          <div className='mb-3'>
            {/* <label htmlFor='#courseName' className='form-label'>Course Name</label> */}
          <input onChange={handleCourseChange} className='form-control'name='course_name' id='courseName' placeholder='course name' type='text' />

          </div>
          <div className='mb-3'>
            {/* <label htmlFor='#courseDescription'  className='form-label'>Description</label> */}
          <input onChange={handleCourseChange}  className='form-control' id='courseDescription' placeholder='description' name='description' type='text' />

          </div>
          <div className='mb-3'>
            {/* <label htmlFor='#courseDuration'  className='form-label'>Duration</label> */}
          <input onChange={handleCourseChange} className='form-control'  name='duration_months' placeholder='Months duration' id='courseDuration'max='6' type='text' />

          </div>
          <div className='mb-3'>
            {/* <label htmlFor='#courseInstructor'  className='form-label'>Instructor</label> */}
          <input onChange={handleCourseChange} className='form-control' name='instructor' id='courseInstructor' placeholder='instructor' type='text' />

          </div>
          <div><button onClick={createCourse} className='btn btn-primary' >Create Course</button></div>
        
        </form>
        </div>
    <div className='col m-auto'>
        <form className='m-auto' style={{width:'50%'}}>
          <div className='mb-3'>
            {/* <label htmlFor='#programName'>Program Name</label> */}
          <input  className='form-control'   onChange={handleProgramChange} name='program_name'  placeholder='Program name' id='programName' type='text' />

          </div>
          <div className='mb-3'>
            {/* <label htmlFor='#programDescription'>Description</label> */}
          <input onChange={handleProgramChange}  className='form-control'   name='description'  placeholder='description' id='programDescriptionName' type='text' />

          </div>
          <div className='mb-3'>
            {/* <label htmlFor='#programDuration'>Duration</label> */}
          <input onChange={handleProgramChange}   className='form-control'  name='duration_months'  placeholder='Months duration' id='programDuration' max='6' type='text' />

          </div>
          <div className='mb-3'>
            {/* <label htmlFor='#programTrainer'>Trainer</label> */}
          <input onChange={handleProgramChange}   className='form-control'  name='trainer' placeholder='trainer' id='programTrainer' type='text' />

          </div>
          <div><button onClick={createProgram} className='btn btn-primary'>Create Program</button></div>
        </form>
        </div>
  </div>
  <div className='row'> 
  <div className='col-sm-6'>
  {courses.map(course=>(

<div key={course.course_id} className="card overflow-auto  mb-5 d-flex" style={{ 
margin: '25px', height: '250px', padding: '10px' }}>
<div className="card-body">
<div>
<h5>Course Name: {course.course_name}</h5>
<h6>Duration: {course.duration_months} months</h6>
<h6>Trainer: {course.trainer}</h6>
<h6>Description</h6>
<h6>{course.description}</h6>
</div>
<button className="mt-3 btn btn-info mb-1 mr-3 w-25">Edit</button>
<button className='mt-3 btn btn-danger w-25' onClick={()=>deleteCourse(course.course_id)}>Delete</button>

</div>
</div>

))}
 </div>
 <div className='col-sm-6'>

{programs.map(program=>(

<div key={program.program_id} className="card overflow-auto  mb-5 d-flex" style={{ margin:'25px', height: '250px', padding:'10px' }}>
<div className='d-flex'>
<img className="card-img-left" src={programImage} alt="Card image cap"></img>
<div className="card-body">
<h5>Program Name: {program.program_name}</h5>
<h6>Duration: {program.duration_months} months</h6>
<h6>Trainer {program.trainer}</h6>
<h6>Description</h6>

<p className='card-text'>{program.description}</p>
<button className='btn btn-info mr-3' >Edit</button>
<button className='btn btn-danger' onClick={()=>deleteProgram(program.program_id)}>Delete</button>
</div>
</div>
</div>
))}
</div>    
  </div>

  </div>
<div className='mb-3'>
</div>

</div>