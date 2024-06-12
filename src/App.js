import './App.css';

import { Routes, Route, BrowserRouter, generatePath} from 'react-router-dom';
import React,{Suspense, lazy} from 'react'

// const {Login} from './components/login.js'
const JobPortal = lazy(() =>delayForDemo( import ( './components/job_portal.js')));
const JobSearch = lazy(() => delayForDemo(import( './components/search_jobs.js')));
const JobSeekerPortal = lazy(() => delayForDemo(import( './components/job_seeker_portal.js')));
const JobApplications = lazy(() => delayForDemo(import( './components/job_applications.js')));
const JobSeekerProfile = lazy(() => delayForDemo(import( './components/jobseeker_profile.js')));
const AppliedJobs = lazy(() => delayForDemo(import( './components/applied_jobs.js')));
const ManageJobs = lazy(() => delayForDemo(import( './components/manage_jobs.js')));
const AdminPage = lazy(() => delayForDemo(import( './components/admin_portal.js')));
const AdminMessages = lazy(() => delayForDemo(import( './components/messages.js')));
const StudentPortal = lazy(() => delayForDemo(import( './components/student_portal.js')));
const MyCoursesAndPrograms = lazy(() => delayForDemo(import( './components/my_courses_and_programs.js')));
const StudentsList = lazy(() => delayForDemo(import( './components/students_list.js')));
const Home = lazy(() => delayForDemo(import( './components/home.js')));
const Signup = lazy(() => delayForDemo(import( './components/signup.js')));
const Programs = lazy(() => delayForDemo(import( './components/training_programs.js')));
const ProgramInfo = lazy(() => delayForDemo(import( './components/program_page.js')));
const Profile = lazy(() => delayForDemo(import( './components/profile.js')));
const EmployerPortal = lazy(() => delayForDemo(import( './components/employer_portal.js')));
const EmployerProfile = lazy(() => delayForDemo(import( './components/employer_profile.js')));
const EmployersList = lazy(() => delayForDemo(import( './components/employers_list.js')));
const Navbar = lazy(() => delayForDemo(import( './components/navbar.js')));
const CoursesAndProgramsManagement = lazy(() => delayForDemo(import( './components/courses&program_management.js')));
const CoursesList = lazy(() => delayForDemo(import( './components/courses_list.js')));
const Footer = lazy(() => delayForDemo(import( './components/footer.js')));
const AdminNotifications = lazy(() => delayForDemo(import( './components/notifications.js')));
const CourseInfo = lazy(() => delayForDemo(import( './components/course_page.js')));
const PageNotFound = lazy(() => import( './components/pagenotfound.js'));
const Login = lazy(() => import('./components/login.js'));
function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}
const Loading = lazy(()=>import('./components/loading.js'))
function App() {


  return (
    <Suspense fallback={<Loading/>}>

    <BrowserRouter>

    <div className='App' style={{minHeight:'100vh'}}>
    <Navbar />

      <Routes>

        <Route path='/loading' element={<Loading/>}/>
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
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer />
    

    </div>

    </BrowserRouter>
</Suspense>
  );
}

export default App;
