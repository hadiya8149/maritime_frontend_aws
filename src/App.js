import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import React from 'react'
import {Login} from './components/login.js'
import JobPortal from './components/job_portal.js';
import JobSearch from './components/search_jobs.js';
import JobSeekerPortal from './components/job_seeker_portal.js';
import JobApplications from './components/job_applications.js';
import JobSeekerProfile from './components/jobseeker_profile.js'
import AppliedJobs from './components/applied_jobs.js';
import ManageJobs from './components/manage_jobs.js';
import AdminPage from './components/admin_portal.js';
import AdminMessages from './components/messages.js';
import StudentPortal from './components/student_portal.js';
import MyCoursesAndPrograms from './components/my_courses_and_programs.js';
import StudentsList from './components/students_list.js';
import Home from './components/home.js';
import Signup from './components/signup.js'
import Programs from './components/training_programs.js';
import ProgramInfo from './components/program_page.js';
import Profile from './components/profile.js';
import EmployerPortal from './components/employer_portal.js';
import EmployerProfile from './components/employer_profile.js'
import EmployersList from './components/employers_list.js';
import Navbar from './components/navbar.js';
import CoursesAndProgramsManagement from './components/courses&program_management.js';
import CoursesList from './components/courses_list.js';
import Footer from './components/footer.js';
import AdminNotifications from './components/notifications.js';
import CourseInfo from './components/course_page.js';
function App() {


  return (
    <BrowserRouter>

    <div className='App' style={{minHeight:'100%'}}>
    <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path='/manage_jobs' element={<ManageJobs/>}/>
        <Route path="/employers_list" element={<EmployersList />} />
        <Route path="/students_list" element={<StudentsList />} />
        <Route path='/programs&courses_management' element={<CoursesAndProgramsManagement/>}/>
        <Route path="/jobs" element={<JobPortal />} />
        <Route path = '/search_jobs' element={<JobSearch/>}/>
        <Route path="/jobseeker" element={<JobSeekerPortal />} />
        <Route path="/job_applications" element={<JobApplications />} />
        <Route path="/jobseeker_profile" element={<JobSeekerProfile />} />
        <Route path="/applied_jobs" element={<AppliedJobs />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path='/my_course&programs' element={<MyCoursesAndPrograms/>}/>
        <Route path="/courses_list" element={<CoursesList />} />
        <Route path='/course_info/:id' element={<CourseInfo/>}/>
        <Route path='/program_info/:id' element={<ProgramInfo/>}/>

        <Route path="/programs" element={<Programs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employer" element={<EmployerPortal />} />
        <Route path="/employer_profile" element={<EmployerProfile />} />
        <Route path='/admin_notifications' element={<AdminNotifications/>}/>
        <Route path='/messages_page' element={<AdminMessages/>} />
      </Routes>
      <Footer />
    

    </div>

    </BrowserRouter>

  );
}

export default App;
